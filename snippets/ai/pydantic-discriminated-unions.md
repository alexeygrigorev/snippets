---
title: "Pydantic Discriminated Unions"
description: "Use Literal type discriminators to model polymorphic block types with Pydantic."
libraries:
  - pydantic
tags:
  - pydantic
  - structured-output
  - python
---

Model polymorphic content blocks using Pydantic discriminated unions. Each block
has a `type: Literal[...]` field that acts as the discriminator. Works well as
structured output format for LLMs.

```python
from pydantic import BaseModel, Field
from typing import Literal, Union


class TextBlock(BaseModel):
    type: Literal["text"] = "text"
    text: str = Field(..., description="Prose content.")


class EquationBlock(BaseModel):
    type: Literal["equation"] = "equation"
    latex: str = Field(..., description="The equation in LaTeX format.")
    description: str | None = Field(None, description="Plain-language meaning.")


class FigureBlock(BaseModel):
    type: Literal["figure"] = "figure"
    caption: str | None = Field(None, description="Figure caption.")
    description: str = Field(..., description="What the figure shows.")


class TableBlock(BaseModel):
    type: Literal["table"] = "table"
    caption: str | None = Field(None, description="Table caption.")
    columns: list[str] = Field(..., description="Column headers.")
    rows: list[list[str]] = Field(..., description="Table rows.")


BlockUnion = Union[TextBlock, EquationBlock, FigureBlock, TableBlock]


class Page(BaseModel):
    page_number: int
    blocks: list[BlockUnion] = Field(..., description="Ordered content blocks.")
```

### Usage

```python
data = {
    "page_number": 42,
    "blocks": [
        {"type": "text", "text": "Consider the following equation:"},
        {"type": "equation", "latex": "E = mc^2", "description": "Mass-energy equivalence"},
        {"type": "table", "columns": ["Variable", "Unit"], "rows": [["E", "Joules"], ["m", "kg"]]},
    ],
}

page = Page.model_validate(data)

for block in page.blocks:
    print(f"{block.type}: {block}")
```

Notes:
- Pydantic automatically picks the right model based on the `type` field.
- Great for LLM structured outputs — the discriminator tells the model which schema to follow.
- Add new block types by creating a new model and adding it to the `Union`.
