---
title: "File Handling"
description: "Common patterns for reading, writing, and manipulating files in Python."
libraries:
  - built-in
  - pathlib
tags:
  - python
  - files
  - io
  - fundamentals
---

Python provides several ways to handle files efficiently and safely.

## Reading Files

```python
# Using context manager (recommended)
with open('data.txt', 'r') as file:
    content = file.read()
    print(content)

# Reading line by line
with open('data.txt', 'r') as file:
    for line in file:
        print(line.strip())

# Reading all lines into a list
with open('data.txt', 'r') as file:
    lines = file.readlines()
```

## Writing Files

```python
# Writing to a file (overwrites existing content)
with open('output.txt', 'w') as file:
    file.write("Hello, World!\n")
    file.write("Second line\n")

# Appending to a file
with open('output.txt', 'a') as file:
    file.write("Appended line\n")
```

## Using pathlib (Modern Approach)

```python
from pathlib import Path

# Read file
path = Path('data.txt')
content = path.read_text()

# Write file
path = Path('output.txt')
path.write_text("Hello from pathlib!\n")

# Check if file exists
if path.exists():
    print("File exists!")
```

Always use context managers (`with` statement) to ensure files are properly closed.
