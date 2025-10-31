---
title: "Adding editable file system dependencies with uv"
description: "How to add ediable local path dependencies and editable installations using uv package manager."
libraries:
  - uv
tags:
  - python
  - uv
  - dependencies
  - packaging
---


Editable installations are useful during local development because edits to the dependency source are available immediately without re-installing.

## Adding an editable path dependency

By default, path dependencies are not installed as editable. To request an editable installation:

```bash
uv add --editable ../projects/bar/
```

This results in:

```toml
[project]
dependencies = ["bar"]

[tool.uv.sources]
bar = { path = "../projects/bar", editable = true }
```
