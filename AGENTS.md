<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project context

**PACT** stands for **Portal Administrativo de Centro de Treinamento** (Training Center Administration Portal). This repository, `pact-web`, contains the Next.js/React web application for training centers to manage their administrative operations.

The intended users are training center staff. The confirmed product scope covers:

- **Students:** managing the student list and student information.
- **Payments:** managing student payment records and tracking payments.
- **Teachers:** managing teacher information and the teaching staff list.
- **Class locations:** managing the places where classes take place.

Other administrative workflows may be added when requested. These areas describe the product's intended scope, not a guarantee that the corresponding features already exist. At this stage, the application contains the initial Next.js scaffold and starter page; backend services, persistence, authentication, and payment integrations have not been established in this repository.

### Domain and implementation guidance

- Use the training center administration context when naming features, components, and domain concepts. Keep students, teachers, payments, and class locations distinct unless a confirmed requirement connects them.
- Do not invent business rules for payment amounts, due dates, billing cycles, payment processing, enrollment, class scheduling, permissions, or relationships between records. Ask the user when a task depends on undefined rules.
- Do not assume a particular training discipline, payment provider, database, backend architecture, or access model.
- Treat student, teacher, and payment information as private. Avoid real personal or financial data in examples, fixtures, and logs.
- Keep README.md aligned with confirmed product scope and implementation status when those change. Clearly distinguish planned capabilities from working features.
- Keep project documentation and agent instructions in English, preserving the official Portuguese expansion of PACT. Confirm the intended interface language when relevant rather than inferring it from documentation language.

## Development guidelines

This project is built with **Next.js and React**, using TypeScript and Tailwind CSS. Follow the project's existing patterns and organization.

### Mobile-first

All interface development must follow a **mobile-first** approach:

- Start with the layout and experience on small screens, then adapt them for tablets and desktops.
- Define base styles for mobile devices and use breakpoints to expand the layout as more space becomes available.
- Prioritize readable content, simple navigation, and comfortable touch targets.
- Avoid fixed widths and unintended horizontal scrolling. Ensure images, forms, and components adapt to the screen.
- Verify behavior on mobile and desktop screens, including loading states, errors, and lengthy content.
- Preserve accessibility through semantic HTML, labeled fields, visible focus indicators, and keyboard navigation.

### Next.js and React

- Before writing code, consult the relevant documentation for the installed version in `node_modules/next/dist/docs/`, as instructed above.
- Follow Next.js conventions and respect the separation between Server and Client Components; use `"use client"` only when necessary.
- Prefer reusable components and keep presentation logic clear and organized.
- Consider performance on mobile devices, avoiding unnecessary JavaScript, dependencies, and loading work.

### Project boundaries and information sources

- Stay within this project's root directory and its subdirectories. Do not access or modify files outside this project.
- Treat this directory as the source of all necessary project information. Inspect the relevant local files and documentation first.
- If additional information is needed, search the internet or ask the user what should be done. Do not explore other local directories to obtain it.

### Task planning

- Assess task complexity before starting implementation.
- For complex tasks, first break the work into clear, manageable subtasks with an ordered plan and a validation step. Keep the plan updated as the work progresses.
- Treat work as complex when it involves multiple interacting areas, architectural decisions, migrations, substantial uncertainty, or changes that require coordinated validation.
- For simple, localized tasks with a clear solution, proceed directly without a formal subtask breakdown.

### Branch workflow

- Before making changes, inspect the current branch and working tree. Preserve existing user changes; do not discard, stash, or commit unrelated work to prepare a branch.
- By default, perform every task on a new branch created from `development`. Use a short, descriptive English name, such as `feat/student-list`, `fix/payment-status`, or `docs/project-context`.
- This rule applies to simple tasks, complex tasks, and their subtasks. Keep subtasks on the task branch unless separate branches are useful; any separate task branches must also start from `development`.
- Write directly on `development` only when the user explicitly permits it for the applicable work. Do not infer permission from convenience, task size, or an earlier exception for unrelated work.
- `main` is exclusively human-managed. Never check it out for work, edit or commit on it, merge or rebase into it, push to it, delete it, or rewrite its history. Integration targets `development` only.
- After implementation, use `code-reviewer` to review the task changes, address actionable findings, and complete validation appropriate to the changes before integration.
- Integrate completed, reviewed, and validated task branches by rebasing the task branch onto the latest `development`, then fast-forwarding `development` to the rebased task branch (`git merge --ff-only <task-branch>`). Do not create a merge commit or rebase `development` onto a task branch.
- Refresh the remote state when a remote is available and ensure local `development` includes the latest remote development history before rebasing. If synchronization is blocked, report the limitation rather than claiming integration against the latest state.
- Resolve rebase conflicts on the task branch, preserving intended behavior. Review affected changes and repeat relevant validation after conflict resolution or material changes caused by the rebase.
- Never force-push `development` or `main`. Do not overwrite collaborators' task-branch history; if rebasing a published branch would require a forced update, coordinate with the user before doing so.
- Direct-development exceptions still require review and appropriate validation; no task-branch rebase is needed for work explicitly authorized directly on `development`.

### Subagent collaboration

- Subagents may perform distinct tasks when parallel work can accelerate development. Delegation is optional; handle simple tasks directly when coordination would add unnecessary overhead.
- Give each subagent a bounded scope, clear expected output, and explicit ownership of files or responsibilities to avoid conflicting edits.
- All subagents must follow this AGENTS.md, the task's branch workflow, and applicable read-only restrictions. Subtasks do not grant permission to work on `main` or write directly on `development` without explicit user authorization.
- When sharing a working tree, subagents must not independently switch branches, rebase, merge, or commit. The coordinating agent owns Git operations and integration.
- The coordinating agent remains responsible for reviewing subagent output, resolving overlaps, and validating the combined result before completion.

### Code review agent

- The project-scoped `code-reviewer` agent is defined in `.codex/agents/code-reviewer.toml`.
- For styling reviews, the reviewer must read and apply the `tailwind-reviewer` skill in `.agents/skills/tailwind-reviewer/SKILL.md`. Keep styles close to their consumers, share them at the smallest appropriate common scope, and use global CSS when application-wide scope is justified.
- When a code review is requested, use this agent to inspect the current task's modified and newly created files, including staged, unstaged, and untracked changes.
- The reviewer must remain read-only and report actionable Clean Code, SOLID, React, Next.js, accessibility, and mobile-first issues with precise file and line references. It must never apply fixes or change Git state.
- Read unchanged code only as needed to understand the current changes; avoid unrelated repository-wide audits.
- Custom agents inherit session permissions. For technical enforcement of read-only access, invoke the reviewer from a session configured with a read-only sandbox; the agent definition does not override the parent sandbox.
