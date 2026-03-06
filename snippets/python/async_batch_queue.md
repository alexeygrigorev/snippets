---
title: "Async Message Batch Queue"
description: "Queue messages and send them in batches at regular intervals to avoid rate limits."
tags:
  - asyncio
  - rate-limiting
  - concurrency
  - python
---

A generic async batch queue that collects items and flushes them periodically.
Useful for rate-limited APIs (Telegram, Slack, webhooks, etc.).

```python
import asyncio
from typing import Callable, Awaitable


class BatchQueue:
    """Collects items and flushes them in batches at regular intervals."""

    def __init__(self, flush_fn: Callable[[list], Awaitable], interval: float = 5.0):
        self._flush_fn = flush_fn
        self._interval = interval
        self._items: list = []
        self._lock = asyncio.Lock()
        self._task: asyncio.Task | None = None
        self._stop = asyncio.Event()

    async def start(self):
        self._stop.clear()
        self._task = asyncio.create_task(self._worker())

    async def stop(self):
        self._stop.set()
        if self._task and not self._task.done():
            await asyncio.wait_for(self._task, timeout=30.0)

    async def put(self, item):
        async with self._lock:
            self._items.append(item)

    async def _flush(self):
        async with self._lock:
            batch = list(self._items)
            self._items.clear()
        if batch:
            await self._flush_fn(batch)

    async def _worker(self):
        while not self._stop.is_set():
            await asyncio.sleep(self._interval)
            await self._flush()
        # Flush remaining items on stop
        await self._flush()
```

### Usage

```python
import asyncio


async def send_to_api(batch: list[str]):
    """Your flush function - called with a list of queued items."""
    combined = "\n".join(batch)
    print(f"Sending {len(batch)} items: {combined[:100]}")


async def main():
    queue = BatchQueue(flush_fn=send_to_api, interval=2.0)
    await queue.start()

    # Simulate rapid message production
    for i in range(10):
        await queue.put(f"Message {i}")
        await asyncio.sleep(0.3)

    await queue.stop()


asyncio.run(main())
```

Notes:
- The queue flushes every `interval` seconds, batching all accumulated items.
- `stop()` flushes remaining items before returning.
- For cross-thread usage, use `asyncio.run_coroutine_threadsafe(queue.put(item), loop)`.
