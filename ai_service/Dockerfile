# Ciel AI Service — production image
# Multi-stage build keeps the final image small and free of build tooling.

FROM python:3.12-slim AS builder

ENV PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /install
COPY ai_service/requirements.txt .
RUN python -m venv /opt/venv \
    && /opt/venv/bin/pip install --upgrade pip \
    && /opt/venv/bin/pip install -r requirements.txt


FROM python:3.12-slim AS runtime

# Run as a non-root user.
RUN useradd --create-home --uid 10001 appuser

ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    ENVIRONMENT=production

WORKDIR /app
COPY --from=builder /opt/venv /opt/venv
COPY ai_service ./ai_service

USER appuser
EXPOSE 8000

# Container-level healthcheck hits the readiness probe.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8000/health/').status==200 else 1)"

# Uvicorn with multiple workers. Tune --workers to the CPU allocation
# (a common rule of thumb is 2 x cores + 1).
CMD ["uvicorn", "ai_service.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4", "--no-access-log"]
