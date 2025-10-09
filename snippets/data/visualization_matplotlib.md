---
title: "Data Visualization with Matplotlib"
description: "Creating charts and plots for data visualization using matplotlib."
libraries:
  - matplotlib
  - numpy
  - pandas
tags:
  - data
  - visualization
  - matplotlib
  - plotting
---

Matplotlib is a powerful library for creating static, animated, and interactive visualizations in Python.

## Basic Line Plot

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)', color='blue', linewidth=2)
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('Sine Wave')
plt.legend()
plt.grid(True)
plt.show()
```

## Multiple Plots

```python
x = np.linspace(0, 10, 100)

plt.figure(figsize=(10, 6))
plt.plot(x, np.sin(x), label='sin(x)')
plt.plot(x, np.cos(x), label='cos(x)')
plt.plot(x, np.tan(x), label='tan(x)')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Trigonometric Functions')
plt.legend()
plt.ylim(-2, 2)
plt.show()
```

## Bar Chart

```python
categories = ['A', 'B', 'C', 'D']
values = [23, 45, 56, 78]

plt.figure(figsize=(8, 6))
plt.bar(categories, values, color='skyblue', edgecolor='navy')
plt.xlabel('Categories')
plt.ylabel('Values')
plt.title('Bar Chart Example')
plt.show()
```

## Scatter Plot

```python
x = np.random.randn(100)
y = np.random.randn(100)
colors = np.random.rand(100)
sizes = 1000 * np.random.rand(100)

plt.figure(figsize=(8, 6))
plt.scatter(x, y, c=colors, s=sizes, alpha=0.5, cmap='viridis')
plt.colorbar()
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Scatter Plot')
plt.show()
```

## Histogram

```python
data = np.random.randn(1000)

plt.figure(figsize=(8, 6))
plt.hist(data, bins=30, edgecolor='black', alpha=0.7)
plt.xlabel('Value')
plt.ylabel('Frequency')
plt.title('Histogram')
plt.show()
```

## Subplots

```python
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

axes[0, 0].plot(x, np.sin(x))
axes[0, 0].set_title('Sine')

axes[0, 1].plot(x, np.cos(x))
axes[0, 1].set_title('Cosine')

axes[1, 0].scatter(x[:50], np.random.randn(50))
axes[1, 0].set_title('Scatter')

axes[1, 1].bar(['A', 'B', 'C'], [1, 2, 3])
axes[1, 1].set_title('Bar')

plt.tight_layout()
plt.show()
```

Matplotlib provides extensive customization options for creating publication-quality figures.
