---
title: "Map with progress (tqdm) for concurrent.futures"
description: "Run a function over a sequence using ThreadPoolExecutor while displaying a tqdm progress bar."
libraries:
  - tqdm
tags:
  - concurrency
  - threading
  - progress
  - python
---

This small helper lets you map a function over a sequence using a thread pool while showing a live progress bar via `tqdm`.


```python
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor

def map_progress(pool, seq, f):
    """Map function f over seq using the provided executor pool while
    displaying a tqdm progress bar. Returns a list of results in submission order.
    """
    results = []
    
    with tqdm(total=len(seq)) as progress:
        futures = []
    
        for el in seq:
            future = pool.submit(f, el)
            future.add_done_callback(lambda p: progress.update())
            futures.append(future)

        for future in futures:
            result = future.result()
            results.append(result)
        
        return results
```

### Usage

Here is a small, runnable example showing how to use `map_progress` with a
`ThreadPoolExecutor` and a simple `anonymize` function.

```python
import re
from concurrent.futures import ThreadPoolExecutor

def anonymize(text: str) -> str:
    """Example anonymization: replace digits with 'X'."""
    return re.sub(r"\d", "X", text)

messages = [
    "User 123: Hello",
    "User 456: Secret 7890",
    "No digits here"
]

with ThreadPoolExecutor(max_workers=4) as pool:
    results = map_progress(pool, messages, anonymize)

print(results)
```

Notes:
- Use a single shared executor (like `pool` above) when calling multiple times to avoid creating many thread pools.
- If your function raises exceptions, they will be propagated when `future.result()` is called; you can handle them with try/except around `future.result()` if desired.
