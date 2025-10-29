# Snippet RULES (for agents)

## Purpose

This document describes rules agents must follow when creating or editing snippet files in this repository. The goal is consistent metadata, readable examples, and predictable behavior for the static site generator and humans reading the repository.

## Location

- Place snippets in one of the category folders under `snippets/` (for example `snippets/python`, `snippets/webdev`, `snippets/data`, etc.).

## Filename

- Use kebab-case (lowercase, hyphens) and a `.md` extension, e.g. `map-with-progress.md`.
- Prefer concise names that describe the snippet's purpose.

## Top-level file structure

Each snippet must be a Markdown file with YAML front matter at the top. Follow this minimal structure:

```markdown
---
title: "Human friendly title"
description: "One-sentence summary"
libraries:
  - external-lib-1
  - external-lib-2
tags:
  - tag1
  - tag2
---

Explanation text...

Code example with ``` fences

Additional notes...
```

## YAML front matter rules

- title: Use sentence case, short and descriptive.
- description: One-line summary for search and listing pages.
- libraries: ONLY list external (third-party) libraries here. Do not list Python/stdlib modules like `os`, `re`, `pathlib`, `concurrent.futures`, or `functools`. If no external libraries are required, use an empty list or omit the field.
- tags: Short keywords used for discovery. Use existing tags when possible (look at other snippets to reuse tags).

## Content guidelines

- Start with a short explanation (2-6 sentences) describing the problem the snippet solves.
- Provide at least one minimal, runnable code example inside fenced code blocks. Use the appropriate language for the fence (e.g., ```` ```python ````).
- Keep examples small and focused: prefer a short working example rather than many long scripts.
- If the snippet requires setup (dependencies, environment variables), include a small "Prerequisites" subsection with exact install commands.
- Include a "Usage" example when the snippet is a utility function or library integration. Show how to call it in practice.
- When given an example, don't expand excessively. Fix small missing pieces (like imports) and clean up messy imports, but don't add multiple variations of the same example. One clear example is sufficient.
- Don't add Notes sections just for the sake of it. Only include Notes when they provide essential information that's not obvious from the code examples.

## Error handling and edge cases

- Mention common edge cases and how the snippet behaves (e.g., exceptions are propagated, functions return None on error, etc.).
- If appropriate, show a short example of handling errors returned from the snippet.

## Formatting and style

- Use Markdown headings and short paragraphs for readability.
- Keep lines under ~100 characters where practical.
- Use code comments sparingly to highlight non-obvious details.
- Prefer explicit imports in examples (do not assume star imports).
- Prefer direct attribute access in examples (e.g., `obj.attr`) and avoid `getattr`/`hasattr` unless the API explicitly requires defensive access. Keep code simple and readable.

## Examples and templates

Include a short runnable example for utilities. Example template to copy:

````markdown
---
title: "My snippet title"
description: "One-line description of what this does"
libraries:
  - requests
tags:
  - http
  - network
---

Short explanation of the snippet.

```python
def snippet_example(arg):
    """Short docstring"""
    return arg * 2

# Usage
if __name__ == "__main__":
    print(snippet_example(2))
```

Notes about behavior, complexity, and potential side-effects.
````

## Testing and validation

- Before adding or editing a snippet, validate the Markdown renders and the code example runs locally.
- If changes include code, provide a simple smoke test in the Usage section that can be copy-pasted and run.


## Commit messages and PRs

- Use a short commit message describing the snippet and the category, e.g. `python: add map-with-progress snippet`.
- In the PR description, include a short note about why the snippet is useful and any external dependencies.


## Do and Don't checklist

- DO: include external libs in `libraries` (e.g., `tqdm`, `requests`).
- DO: include a runnable `Usage` example for utilities.
- DO: follow kebab-case filenames and fill title/description.
- DON'T: list Python standard library modules in `libraries`.
- DON'T: commit extremely long examples (> 300 lines). Keep snippets focused.
- DON'T: mention advantages, disadvantages, or comparisons between frameworks/libraries. Focus purely on code examples and usage.


## Agents: special notes

- Always read the category README for conventions before adding a snippet.
- When in doubt, follow neighboring files' conventions in the same category.
- If you edit an existing snippet, preserve any existing examples and only add clear improvements or fixes; document the change in the commit message.


## Questions / Exceptions

If a snippet doesn't fit these rules (for example, it truly requires system libraries or special binaries), add an explicit `Prerequisites` section explaining what must be present and why the `libraries` field omits system packages.


## License and attribution

- If including code copied from external sources, ensure the license allows redistribution and add an attribution note in the bottom of the file.

