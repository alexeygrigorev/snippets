---
title: "Making API Calls"
description: "Examples of making HTTP requests to external APIs using Python."
libraries:
  - requests
  - httpx
tags:
  - webdev
  - api
  - http
  - python
---

Making API calls is a common task in web development for integrating with external services.

## Using Requests Library

```python
import requests

# GET request
response = requests.get('https://api.example.com/users')
if response.status_code == 200:
    data = response.json()
    print(data)

# GET with parameters
params = {'page': 1, 'limit': 10}
response = requests.get('https://api.example.com/users', params=params)

# POST request with JSON data
payload = {
    'name': 'John Doe',
    'email': 'john@example.com'
}
response = requests.post('https://api.example.com/users', json=payload)
```

## With Authentication

```python
# API key in headers
headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}
response = requests.get('https://api.example.com/protected', headers=headers)

# Basic authentication
from requests.auth import HTTPBasicAuth
response = requests.get('https://api.example.com/secure',
                        auth=HTTPBasicAuth('username', 'password'))
```

## Error Handling

```python
try:
    response = requests.get('https://api.example.com/data', timeout=5)
    response.raise_for_status()  # Raises exception for 4XX/5XX status codes
    data = response.json()
except requests.exceptions.Timeout:
    print("Request timed out")
except requests.exceptions.HTTPError as e:
    print(f"HTTP error: {e}")
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
```

## Async API Calls with httpx

```python
import httpx
import asyncio

async def fetch_data():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://api.example.com/data')
        return response.json()

# Run async function
data = asyncio.run(fetch_data())
```

Always handle errors and set timeouts when making API calls to external services.
