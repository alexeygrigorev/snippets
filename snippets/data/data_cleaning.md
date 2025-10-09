---
title: "Data Cleaning"
description: "Common techniques for cleaning and preprocessing data with pandas."
libraries:
  - pandas
  - numpy
tags:
  - data
  - cleaning
  - preprocessing
  - pandas
---

Data cleaning is a crucial step in any data analysis or machine learning project.

## Handling Missing Values

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'A': [1, 2, np.nan, 4],
    'B': [5, np.nan, np.nan, 8],
    'C': [9, 10, 11, 12]
})

# Check for missing values
print(df.isnull().sum())

# Drop rows with any missing values
df_clean = df.dropna()

# Drop columns with missing values
df_clean = df.dropna(axis=1)

# Fill missing values
df['A'].fillna(df['A'].mean(), inplace=True)  # Fill with mean
df['B'].fillna(0, inplace=True)  # Fill with constant
df.fillna(method='ffill', inplace=True)  # Forward fill
```

## Removing Duplicates

```python
# Check for duplicates
print(df.duplicated().sum())

# Remove duplicates
df_unique = df.drop_duplicates()

# Remove duplicates based on specific columns
df_unique = df.drop_duplicates(subset=['name', 'email'])
```

## Data Type Conversion

```python
# Convert column types
df['age'] = df['age'].astype(int)
df['date'] = pd.to_datetime(df['date'])
df['category'] = df['category'].astype('category')

# Handle errors in conversion
df['price'] = pd.to_numeric(df['price'], errors='coerce')
```

## String Cleaning

```python
# Remove whitespace
df['name'] = df['name'].str.strip()

# Convert to lowercase
df['email'] = df['email'].str.lower()

# Replace values
df['status'] = df['status'].str.replace('active', 'Active')

# Remove special characters
df['text'] = df['text'].str.replace('[^a-zA-Z0-9\s]', '', regex=True)
```

## Outlier Detection and Removal

```python
# Using IQR method
Q1 = df['value'].quantile(0.25)
Q3 = df['value'].quantile(0.75)
IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

df_clean = df[(df['value'] >= lower_bound) & (df['value'] <= upper_bound)]
```

Clean data is essential for accurate analysis and reliable machine learning models.
