---
title: "Dockerfile for Python Service with UV"
description: "Production Dockerfile using UV for fast dependency installation and slim base image."
tags:
  - docker
  - uv
  - devops
  - python
---

A production-ready Dockerfile using UV for fast Python dependency management.

```dockerfile
FROM python:3.12-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

COPY . .

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

Notes:
- `--frozen` ensures the lock file is used exactly as-is.
- `--no-dev` skips dev dependencies in production.
- Copying `pyproject.toml` and `uv.lock` first leverages Docker layer caching — dependencies are only reinstalled when these files change.
- Replace the `CMD` with your actual entrypoint (`gunicorn`, `fastapi`, `flask`, etc.).
