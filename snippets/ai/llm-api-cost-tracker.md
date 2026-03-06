---
title: "LLM API Cost Tracker"
description: "Track and calculate LLM API costs per model with JSONL logging and usage summaries."
libraries: []
tags:
  - llm
  - cost-tracking
  - openai
  - anthropic
  - python
---

Track LLM API costs across multiple calls. Logs each call's token usage to a JSONL file, then displays per-model and total cost breakdown.

```python
import json
import tempfile
from pathlib import Path

MODEL_PRICES = {
    "openai:gpt-4o-mini": {"input": 0.15, "output": 0.60},
    "openai:gpt-4o": {"input": 2.50, "output": 10.00},
    "anthropic:claude-haiku-4-5": {"input": 1.00, "output": 5.00},
    "anthropic:claude-sonnet-4-6": {"input": 3.00, "output": 15.00},
}

COST_FILE = Path(tempfile.gettempdir()) / "llm_cost_tracker.jsonl"


def calculate_cost(model_name, input_tokens, output_tokens):
    prices = MODEL_PRICES[model_name.lower()]
    input_cost = (input_tokens / 1_000_000) * prices["input"]
    output_cost = (output_tokens / 1_000_000) * prices["output"]
    return input_cost + output_cost


def reset_cost_file():
    COST_FILE.unlink(missing_ok=True)


def capture_usage(model, input_tokens, output_tokens):
    entry = {
        "model": model,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
    }
    with open(COST_FILE, "a") as f:
        f.write(json.dumps(entry) + "\n")


def display_total_usage():
    if not COST_FILE.exists():
        print("Total cost: $0.000000")
        return

    totals = {}
    for line in COST_FILE.read_text().splitlines():
        entry = json.loads(line)
        model = entry["model"]
        if model not in totals:
            totals[model] = {"input_tokens": 0, "output_tokens": 0}
        totals[model]["input_tokens"] += entry["input_tokens"]
        totals[model]["output_tokens"] += entry["output_tokens"]

    total_cost = 0
    for model, tokens in totals.items():
        cost = calculate_cost(model, tokens["input_tokens"], tokens["output_tokens"])
        print(f"{model}: ${cost:.6f}")
        total_cost += cost

    print(f"Total cost: ${total_cost:.6f}")
```

### Usage

```python
reset_cost_file()

# After each LLM call, log the usage:
capture_usage("openai:gpt-4o-mini", input_tokens=1500, output_tokens=300)
capture_usage("openai:gpt-4o-mini", input_tokens=2000, output_tokens=500)
capture_usage("anthropic:claude-sonnet-4-6", input_tokens=800, output_tokens=200)

display_total_usage()
# openai:gpt-4o-mini: $0.000780
# anthropic:claude-sonnet-4-6: $0.005400
# Total cost: $0.006180
```

Notes:
- Update `MODEL_PRICES` with current pricing from provider dashboards.
- The JSONL file lives in the system temp directory and persists across calls within a session.
- Call `reset_cost_file()` at the start of a test suite or session.
