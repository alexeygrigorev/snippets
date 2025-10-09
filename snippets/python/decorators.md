---
title: "Python Decorators"
description: "Using decorators to modify or enhance function behavior without changing the function code."
libraries:
  - built-in
  - functools
tags:
  - python
  - decorators
  - functions
  - advanced
---

Decorators allow you to modify the behavior of functions or methods in a clean and reusable way.

## Basic Decorator

```python
import time
from functools import wraps

def timing_decorator(func):
    """Measure execution time of a function"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()
# Output: slow_function took 1.00 seconds
```

## Decorator with Arguments

```python
def repeat(times):
    """Repeat function execution multiple times"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
# Output: 
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!
```

Decorators are powerful tools for cross-cutting concerns like logging, timing, and caching.
