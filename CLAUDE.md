# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repository is a Claude Code plugin marketplace that maintains mods for
developers. A mod is a plugin that changes Claude Code's own interface or
behaviour: a pane or panel, a band above the prompt, a status line entry, a
toast, a slash command, or a hook on tool calls, prompts, or the system prompt.

When creating, changing, or debugging a mod here, load the `plugin-authoring`
skill first. It carries the current API types, examples, and the long-form
reference for this build of Claude Code.

## Layout

```
.claude-plugin/marketplace.json   # lists every mod; source is "./mods/<name>"
mods/<name>/
  .claude-plugin/plugin.json      # { name, version, description, author, optional "types" }
  hooks/hooks.json                # { "modules": ["./register.ts"] }
  hooks/register.ts               # export const register: Register = (on, options) => { ... }
  hooks/*.test.ts                 # at least one test per mod
  types/index.d.ts                # only if the mod keeps values in $.state
  tsconfig.json                   # the options from the types file header
```

`mods/hello` is the reference example: copy it to start a new mod, then add the
new mod to `marketplace.json` and to the table in `README.md`. The mod's
`name` in plugin.json must match its entry in marketplace.json; that name is
what `/plugin install <name> --marketplace yyxai/yy-mods` installs.

The hooks module runs in its own environment with no DOM and no Node. Every
hook is `($, e, next)`: `$` is the engine interface, `e` is the frozen event
input, and `next(e)` passes control down to the engine. A hook that returns
without calling `next` answers for itself. JSX elements come from
`$.ui.resolve(e)`, which gives the right element table for the surface
(terminal, desktop, vscode, mobile).

## Commands

```
claude plugin validate mods/<name>   # checks manifest and module as the engine would
claude plugin test mods/<name>       # runs the mod's *.test.ts files
tsc -p mods/<name>                   # type-check, once the engine has laid .claude-plugin/types/
claude --plugin-dir mods/<name>      # start a session with the mod loaded
```

Tests: nothing sits beneath the plugin in a test, so a test that raises an
event the engine normally answers (for example `session.start`) must answer it
itself with `on('session.start', ($, e) => ({ cwd: e.cwd }))` before calling
`$.session.start(...)`. Observe what the mod draws with `on('ui.status', ...)`
and `on('ui.toast', ...)`.

Hot reloading: once the `plugin-authoring` skill is loaded, the engine watches
the mod folders and reloads a mod at the end of each turn that edits it. A
reload re-runs `register` and fires `session.start` again; values in `$.state`
and `$.store` survive, module variables do not. `.claude-plugin/types/` under
a loaded mod is engine-written and ignored by git.

## Sharing

Mods are installed with `/plugin install <mod> --marketplace yyxai/yy-mods`;
the README holds the install lines. Remote: `https://github.com/yyxai/yy-mods.git`,
default branch `main`.

## Branching and pull requests

Always work in a git worktree when preparing a pull request. Never create the
PR branch in the main checkout. Use the `superpowers:using-git-worktrees`
skill to create the worktree (one per branch, outside or ignored by this
checkout), do the work and commits there, push from there, and open the PR
with `gh pr create`. Remove the worktree once the PR is merged.

Worktree directory: `.worktrees/` at the repository root (ignored by git), one
subfolder per branch.
