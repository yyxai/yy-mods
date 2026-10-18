# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repository maintains Claude Code mods for developers. A mod is a plugin
that changes Claude Code's own interface or behaviour: a pane or panel, a band
above the prompt, a status line entry, a toast, a slash command, or a hook on
tool calls, prompts, or the system prompt.

When creating, changing, or debugging a mod here, load the `plugin-authoring`
skill first. It carries the current API types, examples, and the long-form
reference for this build of Claude Code.

As of the initial commit the repository holds only a README; no mods exist
yet. Update this file as the first mods land.

## Layout of a mod

Each mod lives in its own top-level folder named after the mod:

```
<mod-name>/
  .claude-plugin/plugin.json   # { name, version, description, optional "types" }
  hooks/hooks.json             # { "modules": ["./register.tsx"] }
  hooks/register.tsx           # export const register: Register = (on, options) => { ... }
  types/index.d.ts             # only if the mod keeps values in $.state
  hooks/*.test.ts              # at least one test per mod
```

The hooks module runs in its own environment with no DOM and no Node. Every
hook is `($, e, next)`: `$` is the engine interface, `e` is the frozen event
input, and `next(e)` passes control down to the engine. A hook that returns
without calling `next` answers for itself. JSX elements come from
`$.ui.resolve(e)`, which gives the right element table for the surface
(terminal, desktop, vscode, mobile).

## Commands

```
claude plugin validate <mod folder>   # checks manifest and module as the engine would
claude plugin test <mod folder>       # runs the mod's *.test.ts files
tsc -p <mod folder>                   # type-check, once the engine has laid .claude-plugin/types/
claude --plugin-dir <mod folder>      # start a session with the mod loaded
```

Hot reloading: once the `plugin-authoring` skill is loaded, the engine watches
the mod folders and reloads a mod at the end of each turn that edits it. A
reload re-runs `register` and fires `session.start` again; values in `$.state`
and `$.store` survive, module variables do not.

## Sharing

To publish a mod for `/plugin install <mod> --marketplace yyxai/yy-mods`, add
`.claude-plugin/marketplace.json` at the repository root and document the
install line in the README. Remote: `https://github.com/yyxai/yy-mods.git`,
default branch `main`.

## Branching and pull requests

Always work in a git worktree when preparing a pull request. Never create the
PR branch in the main checkout. Use the `superpowers:using-git-worktrees`
skill to create the worktree (one per branch, outside or ignored by this
checkout), do the work and commits there, push from there, and open the PR
with `gh pr create`. Remove the worktree once the PR is merged.

Worktree directory: `.worktrees/` at the repository root (ignored by git), one
subfolder per branch.
