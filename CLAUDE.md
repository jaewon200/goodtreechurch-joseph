# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This is a **GitHub Spec Kit** project (`spec-kit` v0.11.1, Claude integration) following
Spec-Driven Development (SDD). There is no application code yet — only the `.specify/`
scaffolding that drives a `specify → plan → tasks → implement` workflow. The technology
stack, project structure, and shell commands for the actual product are decided *per feature*
during the `plan` phase and recorded in `specs/<feature>/plan.md` — read the current plan
to learn them (see the auto-managed SPECKIT block at the bottom of this file, which points
to the most recent plan).

## The SDD workflow

Work proceeds one feature at a time through slash commands (each backed by a skill in
`.claude/skills/speckit-*/`). Run them in order; each has a review gate before the next:

1. `/speckit-specify <description>` — creates `specs/NNN-feature/spec.md` from a natural-language description.
2. `/speckit-plan` — generates design artifacts in the feature dir: `plan.md`, and as needed `research.md`, `data-model.md`, `quickstart.md`, `contracts/`.
3. `/speckit-tasks` — generates dependency-ordered `tasks.md` from the plan.
4. `/speckit-implement` — executes the tasks in `tasks.md`.

Supporting commands: `/speckit-clarify` (resolve ambiguities in a spec), `/speckit-analyze`
(cross-check spec/plan/tasks consistency), `/speckit-checklist`, `/speckit-constitution`
(edit project principles), `/speckit-taskstoissues`. The end-to-end workflow with review
gates is also defined in `.specify/workflows/speckit/workflow.yml`.

## Key conventions

- **Feature directories** live in `specs/` and are named `NNN-short-name` (zero-padded sequential number + kebab-case slug), e.g. `001-user-auth`. The number auto-increments from existing dirs.
- **Active feature** is tracked in `.specify/feature.json` (`feature_directory` key), or overridden by the `SPECIFY_FEATURE` / `SPECIFY_FEATURE_DIRECTORY` env vars. Scripts resolve the repo root by walking up to the `.specify/` directory, *not* via git.
- **The constitution** (`.specify/memory/constitution.md`) holds project-wide principles and is a hard gate the plan must pass ("Constitution Check"). It is currently an unfilled template — populate it with `/speckit-constitution` before relying on its gates.
- **Templates** in `.specify/templates/` (`spec-template.md`, `plan-template.md`, `tasks-template.md`, `checklist-template.md`) define the structure of generated artifacts. They are resolved through an override stack: `templates/overrides/` → presets → extensions → core. Put project-specific overrides in `.specify/templates/overrides/`.
- **`[NEEDS CLARIFICATION]`** markers in a spec/plan signal unresolved questions — resolve them (e.g. via `/speckit-clarify`) before proceeding.

## Helper scripts (`.specify/scripts/bash/`)

The skills invoke these; you generally won't call them directly, but they define the contract:

- `create-new-feature.sh` — creates the next feature dir + `spec.md`. Supports `--json`, `--short-name`, `--number N`, `--timestamp`, `--dry-run`.
- `setup-plan.sh` / `setup-tasks.sh` — scaffold `plan.md` / validate prerequisites for `tasks.md`.
- `check-prerequisites.sh` — validates phase prerequisites (`--require-tasks`, `--include-tasks`, `--paths-only`, `--json`); used to gate `tasks`/`implement`.
- `common.sh` — shared path resolution (`get_feature_paths`, `get_repo_root`, template resolution). Prefers `jq`, falls back to `python3`, then `grep`/`sed`.

## Auto-managed context

The `agent-context` extension (`.specify/extensions/agent-context/`) auto-refreshes the
managed block below after `specify` and `plan` (per `.specify/extensions.yml` hooks), pointing
it at the latest `specs/*/plan.md`. **Do not edit content between the `SPECKIT START`/`END`
markers** — it is regenerated.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
