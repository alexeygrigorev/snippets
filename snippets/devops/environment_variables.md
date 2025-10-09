---
title: "Environment Variables"
description: "Managing configuration and secrets using environment variables."
libraries:
  - python-dotenv
  - os
tags:
  - devops
  - configuration
  - secrets
  - environment
---

Environment variables are a secure way to manage configuration and sensitive data.

## Using .env Files

```python
# Install python-dotenv: pip install python-dotenv

# .env file
DATABASE_URL=postgresql://user:pass@localhost/dbname
API_KEY=your-secret-api-key
DEBUG=True
PORT=8000
```

```python
# app.py
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access environment variables
database_url = os.getenv('DATABASE_URL')
api_key = os.getenv('API_KEY')
debug = os.getenv('DEBUG', 'False') == 'True'
port = int(os.getenv('PORT', 8000))

print(f"Database: {database_url}")
print(f"Debug mode: {debug}")
print(f"Running on port: {port}")
```

## Docker Environment Variables

```dockerfile
# Dockerfile
FROM python:3.9-slim

ENV PYTHONUNBUFFERED=1
ENV APP_ENV=production

WORKDIR /app
COPY . .

CMD ["python", "app.py"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - API_KEY=${API_KEY}
      - DEBUG=false
    env_file:
      - .env
    ports:
      - "8000:8000"
```

## Flask Configuration

```python
import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    DATABASE_URL = os.getenv('DATABASE_URL')
    DEBUG = os.getenv('DEBUG', 'False') == 'True'
    
class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
```

## GitHub Actions Secrets

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
      API_KEY: ${{ secrets.API_KEY }}
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy
      run: |
        echo "Deploying with environment variables"
        # Deployment commands here
```

## Best Practices

- Never commit `.env` files to version control
- Add `.env` to `.gitignore`
- Use different values for development and production
- Rotate secrets regularly
- Use secret management services for production (e.g., AWS Secrets Manager, HashiCorp Vault)

Environment variables keep sensitive data secure and configurations flexible.
