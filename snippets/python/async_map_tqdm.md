---
title: "Async map with progress (tqdm) for asyncio"
description: "Run an async function over a sequence with concurrency limiting via asyncio.Semaphore while displaying a tqdm progress bar."
libraries:
  - tqdm
tags:
  - concurrency
  - asyncio
  - progress
  - python
---

This helper lets you map an async function over a sequence with bounded concurrency using `asyncio.Semaphore`, while showing a live progress bar via `tqdm`.

```python
import asyncio
from tqdm.auto import tqdm

async def map_progress(seq, func, max_concurrency=6):
    """Asynchronously map an async function over a sequence with progress bar.
    Limits concurrency to `max_concurrency`.
    """
    semaphore = asyncio.Semaphore(max_concurrency)

    async def run_with_semaphore(item):
        async with semaphore:
            return await func(item)

    coros = [run_with_semaphore(el) for el in seq]
    results = []

    for coro in tqdm(asyncio.as_completed(coros), total=len(seq)):
        result = await coro
        results.append(result)

    return results
```

### Usage

```python
import asyncio
from tqdm.auto import tqdm

async def fetch(url: str) -> str:
    """Simulate an async HTTP fetch."""
    await asyncio.sleep(0.5)
    return f"Response from {url}"

urls = [f"https://example.com/page/{i}" for i in range(20)]

results = await map_progress(urls, fetch, max_concurrency=4)
print(results[:3])
```

Notes:
- `asyncio.as_completed` yields futures in completion order, so `results` may not match the input order.
- The semaphore limits how many coroutines run simultaneously, preventing resource exhaustion.
- Use `tqdm.auto` so the progress bar works in both notebooks and terminals.
