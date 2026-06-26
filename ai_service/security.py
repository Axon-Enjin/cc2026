"""Shared-secret authentication for the AI service.

This service is stateless and trusts the Next.js app (which holds the user's
Supabase RLS session) to authorize the *user*. To stop anyone else from calling
these AI endpoints directly, the web app authenticates itself to us with a
shared bearer token (``AI_SERVICE_API_KEY``).

Behaviour by environment:
  * production  — a key MUST be configured (enforced at startup) and every
                  protected request MUST present it, or we return 401.
  * development — if no key is configured the dependency is a no-op so local
                  dev and the hermetic test suite work without extra setup.
"""

from __future__ import annotations

import hmac

from fastapi import Header, HTTPException, status

from .config import settings


def _extract_token(authorization: str | None) -> str | None:
    if not authorization:
        return None
    scheme, _, credential = authorization.partition(" ")
    if scheme.lower() != "bearer" or not credential:
        return None
    return credential.strip()


async def require_api_key(authorization: str | None = Header(default=None)) -> None:
    """FastAPI dependency that enforces the shared-secret bearer token.

    Uses a constant-time comparison to avoid leaking the key via timing.
    """
    expected = settings.AI_SERVICE_API_KEY.strip()

    if not expected:
        # No key configured. Allowed only outside production (startup validation
        # blocks a production boot without a key, so we can't reach here in prod
        # with an empty key).
        if settings.is_production:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Service authentication is not configured",
            )
        return

    provided = _extract_token(authorization)
    if not provided or not hmac.compare_digest(provided, expected):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
