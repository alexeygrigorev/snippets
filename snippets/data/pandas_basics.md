---
title: "Pandas Basics"
description: "Essential operations for data manipulation using pandas DataFrames."
libraries:
  - pandas
  - numpy
tags:
  - data
  - pandas
  - python
  - dataframes
---

Pandas is the go-to library for data manipulation and analysis in Python.

## Creating DataFrames

```python
import pandas as pd

# From dictionary
data = {
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['New York', 'Paris', 'London']
}
df = pd.DataFrame(data)

# From CSV
df = pd.read_csv('data.csv')

# From list of dictionaries
data = [
    {'name': 'Alice', 'age': 25},
    {'name': 'Bob', 'age': 30}
]
df = pd.DataFrame(data)
```

## Basic Operations

```python
# Display first/last rows
print(df.head())
print(df.tail())

# Get info about DataFrame
print(df.info())
print(df.describe())

# Select columns
ages = df['age']
subset = df[['name', 'age']]

# Filter rows
adults = df[df['age'] >= 18]
ny_residents = df[df['city'] == 'New York']
```

## Data Manipulation

```python
# Add new column
df['age_in_months'] = df['age'] * 12

# Sort
df_sorted = df.sort_values('age', ascending=False)

# Group by
grouped = df.groupby('city')['age'].mean()

# Drop duplicates
df_unique = df.drop_duplicates()

# Handle missing values
df_clean = df.dropna()  # Remove rows with NaN
df_filled = df.fillna(0)  # Fill NaN with 0
```

## Save Data

```python
# Save to CSV
df.to_csv('output.csv', index=False)

# Save to Excel
df.to_excel('output.xlsx', index=False)

# Save to JSON
df.to_json('output.json', orient='records')
```

Pandas makes data manipulation intuitive and efficient for data science workflows.
