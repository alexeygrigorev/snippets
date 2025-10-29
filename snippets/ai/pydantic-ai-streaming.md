---
title: "Pydantic AI — streaming display with Rich"
description: "Display streaming agent execution using a Rich console while iterating over agent events."
libraries:
  - pydantic_ai
  - rich
tags:
  - ai
  - pydantic
  - streaming
---

This snippet shows a simple streaming display helper for running a Pydantic AI agent in streaming mode and rendering progress with the Rich console.

## Streaming result display

```python
import json
from rich.console import Console
from rich.text import Text
from pydantic_ai import Agent


class StreamingResultDisplay:
    """Handles streaming display of agent execution"""
    
    def __init__(self, console: Console):
        self.console = console
        self.tool_emojis = {
            "find_files_by_name": "🔍",
            "read_file": "📖",
            "list_files": "📁",
            "grep_files": "🔎",
        }
    
    async def run_agent_with_streaming(self, agent: Agent, prompt: str):
        """Run agent and display streaming results"""
        self.console.print("  🤖 [bold blue]Starting evaluation...[/bold blue]")

        async with agent.iter(prompt) as run:
            result = None
            async for node in run:
                if Agent.is_user_prompt_node(node):
                    # User prompt submitted
                    pass
                elif Agent.is_model_request_node(node):
                    await self._handle_model_request(node, run)
                elif Agent.is_call_tools_node(node):
                    await self._handle_tool_calls(node, run)
                elif Agent.is_end_node(node):
                    result = self._handle_completion(run)

        return result
    
    async def _handle_model_request(self, node, run):
        """Handle model thinking/responding"""
        self.console.print("  🧠 [bold yellow]Model analyzing...[/bold yellow]")
        
        async with node.stream(run.ctx) as request_stream:
            async for event in request_stream:
                # Check by class name to avoid SDK-specific imports
                if event.__class__.__name__ == 'FinalResultEvent':
                    self.console.print("  ✨ [bold magenta]Generating final result...[/bold magenta]")
                    self.console.print("  📋 [bold cyan]Creating structured result...[/bold cyan]")
                    break
    
    async def _handle_tool_calls(self, node, run):
        """Handle tool usage display"""
        async with node.stream(run.ctx) as handle_stream:
            async for event in handle_stream:
                name = event.__class__.__name__
                if name == 'FunctionToolCallEvent':
                    self._display_tool_call(event)
                elif name == 'FunctionToolResultEvent':
                    # Don't show result output - too verbose
                    pass
    
    def _display_tool_call(self, event):
        """Display a single tool call"""
        emoji = self.tool_emojis.get(event.part.tool_name, "🔧")
        
        # Format args for display
    args_str = ""
    args_val = event.part.args
        if args_val:
            try:
                args_dict = json.loads(args_val)
                args_items = []
                for k, v in args_dict.items():
                    if isinstance(v, str) and len(v) > 30:
                        v = v[:30] + "..."
                    args_items.append(f"{k}={v}")
                args_str = f"({', '.join(args_items)})"
            except (json.JSONDecodeError, AttributeError, TypeError):
                s = str(args_val)
                if len(s) > 50:
                    s = s[:50] + '...'
                args_str = f"({s})"

        tool_text = Text(f"  {emoji} ")
        tool_text.append(event.part.tool_name, style="bold green")
        tool_text.append(args_str, style="dim")
        self.console.print(tool_text)
    
    def _handle_completion(self, run):
        """Handle evaluation completion"""
        assert run.result is not None
        result = run.result
        self.console.print("  ✅ [bold green]Evaluation complete![/bold green]")
        return result
```

## Usage

```python
from rich.console import Console

# Prepare your Agent instance elsewhere
# agent = Agent(...)

console = Console()
streamer = StreamingResultDisplay(console)

prompt = "Find and summarize recent changes"
result = await streamer.run_agent_with_streaming(agent, prompt)
```
