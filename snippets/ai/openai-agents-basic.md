---
title: "OpenAI Agents SDK — basic agent and runner"
description: "Using the OpenAI Agents SDK to create agents with tools and run them with the basic Runner class."
libraries:
  - agents
tags:
  - ai
  - agents
  - openai
  - async
---

This snippet demonstrates using the OpenAI Agents SDK directly to create agents with tools and execute them using the basic `Runner` class.

## Basic setup with Runner

```python
from agents import Agent, function_tool
from agents import Runner

# Define a tool function
def get_page_content(url: str) -> str:
    """Fetch and return the content of a web page."""
    # Implementation would fetch actual page content
    pass

# Create agent with instructions and tools
assistant_instructions = """
You're a helpful assistant that helps answer user questions.
"""

assistant = Agent(
    name='assistant',
    tools=[function_tool(get_page_content)],
    instructions=assistant_instructions,
    model='gpt-4o-mini'
)

runner = Runner()

user_prompt = "Summarize the content of https://openai.github.io/openai-agents-python/"
result = await runner.run(assistant, input=user_prompt)


response_text = result.new_items[-1].raw_item.content[0].text
print(response_text)
```

## Accessing result details

```python
# After running an agent, you can access various result properties
result = await runner.run(assistant, input=user_prompt)

# Get the latest response text
latest_response = result.new_items[-1].raw_item.content[0].text
```