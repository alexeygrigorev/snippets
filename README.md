# Code Snippets Collection

A curated collection of practical code snippets organized by category, built with Jekyll for easy browsing and searching.

## Overview

This repository contains categorized code snippets covering various programming topics including AI, Python, Web Development, Data Analysis, and DevOps. Each snippet is documented with:
- Clear explanations
- Code examples with comments
- Dependencies and libraries used
- Relevant tags for easy discovery

## Repository Structure

```
snippets/
├── ai/              # AI and machine learning snippets
├── python/          # Python programming snippets
├── webdev/          # Web development snippets
├── data/            # Data analysis and visualization snippets
└── devops/          # DevOps and infrastructure snippets
```

Each category folder contains:
- `README.md` - Category description and overview
- Multiple `.md` files - Individual snippets with YAML front matter

## Snippet Format

Each snippet follows this structure:

```markdown
---
title: "Snippet Title"
description: "Brief description of what the snippet does"
libraries:
  - library1
  - library2
tags:
  - tag1
  - tag2
---

Explanation text...

​```python
# Code example
print("Hello, World!")
​```

Additional notes...
```

## Building the Site

This repository uses Jekyll to generate a static website from the snippets.

### Prerequisites

- Ruby (2.7 or higher)
- Bundler

### Installation

```bash
# Install dependencies
bundle install

# Build the site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`

## Features

- **Category Navigation** - Browse snippets organized by topic
- **Tag-based Filtering** - Find snippets by tags across all categories
- **Search Functionality** - Full-text search using Lunr.js
- **Syntax Highlighting** - Code snippets with proper syntax highlighting via Rouge
- **Responsive Design** - Mobile-friendly interface
- **Clean Layouts** - Three main layouts: homepage, category, and snippet

## Contributing

To add a new snippet:

1. Choose the appropriate category folder
2. Create a new `.md` file with a descriptive name
3. Add YAML front matter with title, description, libraries, and tags
4. Write the snippet content with explanations and code examples
5. Test locally with `bundle exec jekyll serve`

## License

This repository is open source and available for educational purposes.
