---
title: "Dockerfile Basics"
description: "Essential Dockerfile instructions for building container images."
libraries:
  - docker
tags:
  - devops
  - docker
  - containers
  - deployment
---

Docker allows you to package applications and their dependencies into portable containers.

## Basic Dockerfile

```dockerfile
# Use official Python runtime as base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run application
CMD ["python", "app.py"]
```

## Multi-Stage Build

```dockerfile
# Build stage
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Python Web Application

```dockerfile
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project
COPY . .

# Create non-root user
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
```

## Building and Running

```bash
# Build image
docker build -t myapp:latest .

# Run container
docker run -d -p 8000:8000 --name myapp myapp:latest

# View logs
docker logs myapp

# Stop and remove
docker stop myapp
docker rm myapp
```

Dockerfiles provide a reproducible way to build and deploy applications.
