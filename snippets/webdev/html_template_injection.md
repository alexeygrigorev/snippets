---
title: "HTML Template Injection with Jinja2"
description: "Using Jinja2 templates to dynamically generate HTML in Flask applications."
libraries:
  - flask
  - jinja2
tags:
  - webdev
  - templates
  - jinja2
  - html
---

Jinja2 is the templating engine used by Flask to generate dynamic HTML content.

## Basic Template Variables

{% raw %}
```html
<!-- templates/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
    <h1>Welcome, {{ username }}!</h1>
    <p>Today is {{ current_date }}</p>
</body>
</html>
```
{% endraw %}

```python
# app.py
from flask import Flask, render_template
from datetime import datetime

@app.route('/')
def home():
    return render_template('index.html',
                           title='Home Page',
                           username='Alice',
                           current_date=datetime.now().strftime('%Y-%m-%d'))
```

## Conditional Rendering

{% raw %}
```html
<!-- templates/user.html -->
{% if user.is_admin %}
    <p>Admin privileges enabled</p>
{% else %}
    <p>Regular user access</p>
{% endif %}
```
{% endraw %}

## Looping Through Lists

{% raw %}
```html
<!-- templates/items.html -->
<ul>
{% for item in items %}
    <li>{{ item.name }} - ${{ item.price }}</li>
{% endfor %}
</ul>
```
{% endraw %}

## Template Inheritance

{% raw %}
```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}Default Title{% endblock %}</title>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>

<!-- templates/page.html -->
{% extends "base.html" %}
{% block title %}My Page{% endblock %}
{% block content %}
    <h1>Page Content</h1>
{% endblock %}
```
{% endraw %}

Jinja2 templates provide powerful features for generating dynamic HTML safely.
