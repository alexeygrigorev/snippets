---
title: "List Comprehensions"
description: "A concise way to create lists in Python using a single line of code."
libraries:
  - built-in
tags:
  - python
  - lists
  - syntax
  - fundamentals
---

List comprehensions provide a compact way to generate lists from other iterables.

## Basic List Comprehension

```python
# Example: create a list of squares from 0 to 9
squares = [x**2 for x in range(10)]
print(squares)
# Output: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

This is equivalent to:

```python
squares = []
for x in range(10):
    squares.append(x**2)
```

## With Conditions

```python
# Example: filter even numbers and square them
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)
# Output: [0, 4, 16, 36, 64]
```

## Nested List Comprehensions

```python
# Example: flatten a 2D matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

List comprehensions are more Pythonic and often faster than traditional loops.
