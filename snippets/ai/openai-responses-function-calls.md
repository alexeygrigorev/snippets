---
title: "OpenAI Responses API — accessing function calls, messages, and usage"
description: "Examples showing how to call the Responses API, read function call outputs, inspect returned messages, and examine usage metadata."
libraries:
  - openai
tags:
  - ai
  - openai
  - api
  - function-calls
---

This snippet demonstrates using the OpenAI Responses API (the `responses.create` call), how to detect and access function/tool calls returned by the model, and how to read the message text and usage information.

## Example request with function calls

```python
search_tool = {
    "type": "function",
    "name": "search",
    "description": "Search the FAQ database",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "Search query text to look up in the course FAQ."
            }
        },
        "required": ["query"],
        "additionalProperties": False
    }
}

instructions = """
You're a course teaching assistant. 
You're given a question from a course student and your task is to answer it.

If you want to look up the answer, explain why before making the call
""".strip()

tools = [search_tool]

question = 'I just discovered the course. Can I still join it?'

chat_messages = [
    {"role": "developer", "content": instructions},
    {"role": "user", "content": question}
]

response = openai_client.responses.create(
    model='gpt-4o-mini',
    input=chat_messages,
    tools=tools,
)

# `response` is a Response object. The model can return normal text output
# or include a function/tool call inside `response.output`.
```

## Function call

```python
import json

def make_call(item):
    args = json.load(item.arguments)
    f_name = item.name

    result = ... # invoke f_name(**args)
    json_results = json.dumps(result)

    return {
        "type": "function_call_output",
        "call_id": call.call_id,
        "output": json_results,
    }

for item in response.output:
    if item.type == 'function_call':
        function_call_output = make_call(item)
        messages.append(function_call_output)
```

## Message text


```python
print(response.output_text)
```

Or

```python
for item in response.output:
    if item.type == 'message':
        print(item.content[0].text)
```


# Usage details: tokens and costs

```python
usage = response.usage
print('Input tokens:', usage.input_tokens)
print('Output tokens:', usage.output_tokens)
print('Total tokens:', usage.total_tokens)
```

