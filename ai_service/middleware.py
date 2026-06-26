"""Production middleware: request IDs, body-size limits, rate limiting, headers.

These are deliberately dependency-free (no slowapi/redis) so the service stays
easy to deploy. The rate limiter is per-process and best-effort — behind
multiple workers it limits per worker, which is fine as a first line of defense.
Put a real gateway/CDN limiter in front for hard guarantees.
"""

from __future__ import annotations

import logging
import time
import uuid
from collections import deque

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response

logger = logging.getLogger("ai_service.request")


class RequestContextMiddleware(BaseHTTPMiddleware):
    """Attach a request ID, emit a structured access log, and set safe headers."""

    async def dispatch(self, request: Request, call_next):
        request_id = request.headers.get("x-request-id") or uuid.uuid4().hex
        request.state.request_id = request_id
        started = time.perf_counter()

        try:
            response: Response = await call_next(request)
        except Exception:
            # Let the registered exception handlers format the body; just log
            # with the correlation id and re-raise.
            elapsed_ms = (time.perf_counter() - started) * 1000
            logger.exception(
                "request_failed id=%s method=%s path=%s elapsed_ms=%.1f",
                request_id,
                request.method,
                request.url.path,
                elapsed_ms,
            )
            raise

        elapsed_ms = (time.perf_counter() - started) * 1000
        logger.info(
            "request id=%s method=%s path=%s status=%s elapsed_ms=%.1f",
            request_id,
            request.method,
            request.url.path,
            response.status_code,
            elapsed_ms,
        )

        response.headers["X-Request-ID"] = request_id
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Referrer-Policy", "no-referrer")
        return response


class BodySizeLimitMiddleware(BaseHTTPMiddleware):
    """Reject requests whose declared body exceeds ``max_bytes`` (Content-Length)."""

    def __init__(self, app, max_bytes: int):
        super().__init__(app)
        self.max_bytes = max_bytes

    async def dispatch(self, request: Request, call_next):
        content_length = request.headers.get("content-length")
        if content_length is not None:
            try:
                if int(content_length) > self.max_bytes:
                    return JSONResponse(
                        status_code=413,
                        content={"detail": "Request body too large"},
                    )
            except ValueError:
                return JSONResponse(
                    status_code=400, content={"detail": "Invalid Content-Length header"}
                )
        return await call_next(request)


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Simple per-client sliding-window rate limiter (per process).

    Keyed by client IP. Health checks are exempt so orchestrators can probe
    freely. Returns 429 with a ``Retry-After`` header when the window is full.
    """

    def __init__(self, app, max_requests: int, window_seconds: int):
        super().__init__(app)
        self.max_requests = max_requests
        self.window = window_seconds
        self._hits: dict[str, deque[float]] = {}

    def _client_key(self, request: Request) -> str:
        return request.client.host if request.client else "unknown"

    async def dispatch(self, request: Request, call_next):
        if request.url.path.startswith("/health") or request.url.path == "/":
            return await call_next(request)

        key = self._client_key(request)
        now = time.monotonic()
        window_start = now - self.window
        bucket = self._hits.setdefault(key, deque())

        while bucket and bucket[0] < window_start:
            bucket.popleft()

        if len(bucket) >= self.max_requests:
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded"},
                headers={"Retry-After": str(self.window)},
            )

        bucket.append(now)
        return await call_next(request)
