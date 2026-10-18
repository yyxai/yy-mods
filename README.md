# yy-mods

Claude Code mods for developers: plugins that change Claude Code's own
terminal interface or behaviour (panes, status line entries, toasts, slash
commands, hooks on tool calls and prompts).

Each mod lives under `mods/<name>/` and is installed on its own.

## Install

At the prompt of a terminal session:

```
/plugin install hello --marketplace yyxai/yy-mods
```

Answer `y` to add the marketplace, then pick a scope (user scope installs it for
every session).

From a shell:

```
claude plugin install hello --marketplace yyxai/yy-mods
```

In the desktop app, where `/plugin` does not run: click + next to the prompt
box, then Plugins, Add marketplace with `yyxai/yy-mods`, then Add plugin.

## Mods

| Mod | What it does |
| --- | --- |
| `hello` | Example mod: shows a status line entry and a toast when a session starts. Copy it to start a new mod. |
| `where-am-i` | A live recap above the prompt: goal, doing now, waiting on you, next. `/where` gives a longer one. Imported from [hamzafer/claude-code-mods](https://github.com/hamzafer/claude-code-mods) (MIT). |
| `usage-meter` | Your plan's 5-hour and 7-day usage as small bars above the prompt, with the reset countdown and the session's cost. Imported from [hamzafer/claude-code-mods](https://github.com/hamzafer/claude-code-mods) (MIT). |

## Developing

```
claude plugin validate mods/<name>   # check manifest and hooks module
claude plugin test mods/<name>       # run the mod's *.test.ts files
claude --plugin-dir mods/<name>      # start a session with the mod loaded
```
