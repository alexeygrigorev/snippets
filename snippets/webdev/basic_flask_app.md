---
title: "Basic Flask Application"
description: "Create a simple Flask web application with routing and templates."
libraries:
  - flask
tags:
  - webdev
  - flask
  - python
  - backend
---

Flask is a lightweight Python web framework that makes it easy to build web applications.

## Basic Flask App

```python
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/greet/<name>')
def greet(name):
    return f"Hello, {name}!"

if __name__ == '__main__':
    app.run(debug=True)
```

## With Templates

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html', title='Home')

@app.route('/user/<username>')
def user_profile(username):
    user_data = {
        'username': username,
        'email': f'{username}@example.com'
    }
    return render_template('profile.html', user=user_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

## Handling Form Data

```python
@app.route('/submit', methods=['GET', 'POST'])
def submit_form():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        return f"Received: {name}, {email}"
    return render_template('form.html')
```

Flask provides a simple and flexible way to build web applications quickly.
