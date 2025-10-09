---
title: "ToyAIKit with Pydantic AI"
description: "Using ToyAIKit with Pydantic AI to create type-safe agents with structured tools and async chat interfaces."
libraries:
  - toyaikit
  - pydantic_ai
tags:
  - ai
  - pydantic
  - async
  - tools
---

This snippet demonstrates using ToyAIKit with Pydantic AI to create type-safe agents. Pydantic AI provides structured validation and type safety for agent interactions.

## Basic Pydantic AI setup

```python
from pydantic_ai import Agent

from toyaikit.tools import get_instance_methods
from toyaikit.chat import IPythonChatInterface
from toyaikit.chat.runners import PydanticAIRunner


agent_tools = ... # tools class

coding_agent_tools_list = get_instance_methods(agent_tools)

coding_agent = Agent(
    'openai:gpt-4o-mini',
    instructions="You are a coding agent that can modify Django projects.",
    tools=coding_agent_tools_list
)

chat_interface = IPythonChatInterface()
runner = PydanticAIRunner(
    chat_interface=chat_interface,
    agent=coding_agent
)

# Run asynchronously
await runner.run()
```

## Complete example with tools class

```python
from pydantic_ai import Agent
from toyaikit.tools import get_instance_methods
from toyaikit.chat import IPythonChatInterface
from toyaikit.chat.runners import PydanticAIRunner

class DjangoTools:
    def create_model(self, app_name: str, model_name: str, fields: str) -> str:
        """Create a new Django model in the specified app."""
        pass
    
    def run_migration(self, app_name: str) -> str:
        """Run Django migrations for an app."""
        pass
    
    def create_view(self, app_name: str, view_name: str, view_type: str = "function") -> str:
        """Create a new Django view."""
        pass

django_tools = DjangoTools()
tools_list = get_instance_methods(django_tools)

# Create Pydantic AI agent
coding_agent = Agent(
    'openai:gpt-4o-mini',
    instructions=...,
    tools=tools_list
)
```
