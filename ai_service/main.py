
"""
Ciel AI Service - FastAPI Application
Implements PRD-F1 Theory of Change Generator
Date: 2026-06-25
"""

from fastapi import Depends, FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from contextlib import asynccontextmanager
import logging

from .config import settings
from .middleware import (
    BodySizeLimitMiddleware,
    RateLimitMiddleware,
    RequestContextMiddleware,
)
from .routers import grants, health, mande, toc
from .security import require_api_key

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle manager for startup and shutdown events."""
    # Startup — fail fast on an unsafe production configuration.
    problems = settings.validate_for_production()
    if problems:
        for problem in problems:
            logger.error("Unsafe production config: %s", problem)
        raise RuntimeError(
            "Refusing to start in production with an unsafe configuration: "
            + "; ".join(problems)
        )

    logger.info("Starting Ciel AI Service...")
    logger.info("Environment: %s", settings.ENVIRONMENT)
    logger.info("Foundry configured: %s", settings.ai_ready)
    logger.info("Service auth enabled: %s", bool(settings.AI_SERVICE_API_KEY.strip()))

    yield

    # Shutdown
    logger.info("Shutting down Ciel AI Service...")


# Create FastAPI app. Hide interactive docs in production to reduce surface area.
_docs_enabled = not settings.is_production
app = FastAPI(
    title="Ciel AI Service",
    description="AI-native Impact Operating System - Theory of Change Generator",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if _docs_enabled else None,
    redoc_url="/redoc" if _docs_enabled else None,
    openapi_url="/openapi.json" if _docs_enabled else None,
)

# Middleware (executes in reverse registration order for requests).
app.add_middleware(RequestContextMiddleware)
if settings.RATE_LIMIT_ENABLED:
    app.add_middleware(
        RateLimitMiddleware,
        max_requests=settings.RATE_LIMIT_REQUESTS,
        window_seconds=settings.RATE_LIMIT_WINDOW_SECONDS,
    )
app.add_middleware(BodySizeLimitMiddleware, max_bytes=settings.MAX_REQUEST_BYTES)

# Configure CORS. Restrict methods/headers rather than wildcarding alongside
# credentials, and only expose the verbs this API actually serves.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Request-ID"],
)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Preserve intended HTTP errors but attach the correlation id."""
    request_id = getattr(request.state, "request_id", None)
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "request_id": request_id},
        headers=getattr(exc, "headers", None),
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Return a 422 without echoing the raw input back to the caller."""
    request_id = getattr(request.state, "request_id", None)
    return JSONResponse(
        status_code=422,
        content={"detail": "Invalid request payload", "request_id": request_id},
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    """Never leak internal error details/stack traces to clients."""
    request_id = getattr(request.state, "request_id", None)
    logger.exception("Unhandled error request_id=%s", request_id)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "request_id": request_id},
    )


# Include routers. Health is public (orchestrator probes); the business routers
# require the shared-secret service token.
_protected = [Depends(require_api_key)]
app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(toc.router, prefix="/toc", tags=["theory-of-change"], dependencies=_protected)
app.include_router(grants.router, prefix="/grants", tags=["grants"], dependencies=_protected)
app.include_router(mande.router, prefix="/mande", tags=["mande"], dependencies=_protected)


@app.get("/")
async def root():
    """Root endpoint - service info."""
    return {
        "service": "Ciel AI Service",
        "version": "1.0.0",
        "status": "operational",
        "environment": settings.ENVIRONMENT,
        "docs": "/docs",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "ai_service.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.ENVIRONMENT == "development",
    )