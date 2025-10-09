---
title: "ToyAIKit — building AI assistants with tools"
description: "Using ToyAIKit to create AI assistants with custom tools and interactive chat interfaces."
libraries:
  - toyaikit
  - openai
tags:
  - ai
  - tools
  - assistant
  - chat
---

ToyAIKit is a library for building AI assistants with custom tools and interactive chat interfaces. This example shows how to create a simple weather assistant that can respond to user queries using function calls.

## Basic setup with tools

```python
from openai import OpenAI

from toyaikit.llm import OpenAIClient
from toyaikit.tools import Tools
from toyaikit.chat import IPythonChatInterface
from toyaikit.chat.runners import OpenAIResponsesRunner

# Create tools container
tools = Tools()

# Add a simple function as a tool
# important: define doc strings and typehints
def get_weather(city: str):
    """Get weather information for a city."""
    return f"Weather in {city}: Sunny, 25°C"

tools.add_tool(get_weather)

# Create chat interface and client
chat_interface = IPythonChatInterface()
openai_client = OpenAIClient(
    model="gpt-4o-mini",
    client=OpenAI()
)

# Create and run chat assistant
runner = OpenAIResponsesRunner(
    tools=tools,
    developer_prompt="You are a helpful weather assistant.",
    chat_interface=chat_interface,
    llm_client=openai_client
)

runner.run()
```

## Adding multiple tools

You can add all public methods of a class

```python
# Add all methods from a class instance
# important: have docstrings and typehints
class MathTools:
    def add(self, a: float, b: float) -> float:
        """Add two numbers."""
        return a + b
    
    def multiply(self, a: float, b: float) -> float:
        """Multiply two numbers."""
        return a * b

math_tools = MathTools()
tools.add_tools(math_tools)
```
