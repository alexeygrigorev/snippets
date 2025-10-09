---
title: "ToyAIKit loops with callbacks and cost tracking"
description: "Using ToyAIKit callbacks to display intermediate results and track API costs in OpenAI Responses runner."
libraries:
  - toyaikit
tags:
  - ai
  - callbacks
  - cost-tracking
  - toyaikit
---

This snippet shows how to use ToyAIKit's callback system to display intermediate results and track API costs when running queries with the OpenAI Responses runner.

## Basic setup

```python
from toyaikit.llm import OpenAIClient
from toyaikit.chat import IPythonChatInterface
from toyaikit.chat.runners import OpenAIResponsesRunner
from toyaikit.chat.runners import DisplayingRunnerCallback
from toyaikit.tools import Tools

chat_interface = IPythonChatInterface()
callback = DisplayingRunnerCallback(chat_interface)

runner = OpenAIResponsesRunner(
    tools=agent_tools,
    developer_prompt=instructions,
    chat_interface=chat_interface,
    llm_client=OpenAIClient()
)

question = 'how do I install kafka'
loop_result = runner.loop(prompt=question, callback=callback)
```

## Accessing cost

```python
cost_info = loop_result.cost

print(f"Input cost: ${cost_info.input_cost}")
print(f"Output cost: ${cost_info.output_cost}")
print(f"Total cost: ${cost_info.total_cost}")
```

## Continuing conversations with previous context

The `loop()` method can maintain conversation context by passing previous messages from earlier interactions:

```python
question = 'how do I install kafka'

loop_result = runner.loop(
    prompt=question,
    callback=callback
)

follow_up_question = 'but how do I run it in python?'

loop_result = runner.loop(
    prompt=follow_up_question, 
    previous_messages=loop_result.new_messages, 
    callback=callback
)
```