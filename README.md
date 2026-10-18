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

## Developing

```
claude plugin validate mods/<name>   # check manifest and hooks module
claude plugin test mods/<name>       # run the mod's *.test.ts files
claude --plugin-dir mods/<name>      # start a session with the mod loaded
```
