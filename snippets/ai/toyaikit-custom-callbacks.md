---
title: "ToyAIKit custom callbacks"
description: "Creating custom callback classes by extending RunnerCallback to handle function calls, messages, and responses in ToyAIKit runners."
libraries:
  - toyaikit
tags:
  - ai
  - callbacks
  - toyaikit
---

This snippet shows how to create custom callbacks for ToyAIKit runners by extending the `RunnerCallback` base class. Custom callbacks allow you to handle different events during agent execution.



```python
from toyaikit.chat.runners import RunnerCallback
from toyaikit.chat.runners import OpenAIResponsesRunner

class StreamlitCallback(RunnerCallback):
    
    def on_function_call(self, function_call, result):
        pass

    def on_message(self, message):
        pass
    
    def on_reasoning(self, reasoning):
        pass

    def on_response(self, response):
        pass

# Use the custom callback
runner = OpenAIResponsesRunner(
    tools=tools,
    developer_prompt=developer_prompt,
    llm_client=llm_client,
)

callback = StreamlitCallback()

result = runner.loop(
    prompt=question,
    previous_messages=previous_messages,
    callback=callback,
)
```
