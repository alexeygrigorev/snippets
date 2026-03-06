---
title: "Python Project Makefile"
description: "Makefile with targets for testing, linting, formatting, Docker build, and integration tests."
tags:
  - makefile
  - devops
  - python
  - testing
---

Standard Makefile for Python projects with quality checks and Docker workflow.

```makefile
LOCAL_TAG := $(shell date +"%Y-%m-%d-%H-%M")
IMAGE_NAME := my-service:$(LOCAL_TAG)

.PHONY: test quality build integration_test setup

setup:
	uv sync

test:
	uv run pytest tests/

quality:
	uv run ruff check .
	uv run ruff format .

build: quality test
	docker build -t $(IMAGE_NAME) .

integration_test: build
	LOCAL_IMAGE_NAME=$(IMAGE_NAME) bash scripts/integration-test.sh

publish: build integration_test
	LOCAL_IMAGE_NAME=$(IMAGE_NAME) bash scripts/publish.sh
```

Notes:
- `build` depends on `quality` and `test` — code must pass checks before building.
- The image tag includes a timestamp for unique versioning.
- Replace `ruff` with `black`/`isort`/`pylint` if preferred.
- Run individual targets: `make test`, `make quality`, `make build`.
