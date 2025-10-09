---
title: "ToyAIKit with OpenAI Agents SDK"
description: "Using ToyAIKit with the OpenAI Agents SDK to create persistent agents with tools and async chat interfaces."
libraries:
  - toyaikit
  - agents
tags:
  - ai
  - agents
  - async
  - tools
---

This snippet demonstrates using ToyAIKit with the OpenAI Agents SDK to create persistent agents. Unlike the Responses API, agents maintain conversation state and can handle more complex workflows.

## Basic agent setup

```python
from agents import Agent, function_tool

from toyaikit.tools import wrap_instance_methods
from toyaikit.chat import IPythonChatInterface
from toyaikit.chat.runners import OpenAIAgentsSDKRunner


agent_tools = ... # your tools class instance
coding_agent_tools_list = wrap_instance_methods(function_tool, agent_tools)

coding_agent = Agent(
    name="CodingAgent",
    instructions="You are a coding agent that can modify Django projects.",
    tools=coding_agent_tools_list,
    model='gpt-4o-mini'
)

chat_interface = IPythonChatInterface()
runner = OpenAIAgentsSDKRunner(
    chat_interface=chat_interface,
    agent=coding_agent
)

# In Jupyter, run asynchronously
await runner.run()
```

## Using tools

```python
class DjangoTools:
    def create_model(self, app_name: str, model_name: str, fields: str):
        """Create a new Django model in the specified app."""
        pass
    
    def run_migration(self, app_name: str):
        """Run Django migrations for an app."""
        pass
    
    def create_view(self, app_name: str, view_name: str, view_type: str):
        """Create a new Django view."""
        pass

# Create tools instance and wrap methods
django_tools = DjangoTools()
agent_tools_list = wrap_instance_methods(function_tool, django_tools)

# Create the agent
coding_agent = Agent(
    name="DjangoCodingAgent",
    instructions=...,
    tools=agent_tools_list,
    model='gpt-4o-mini'
)
```