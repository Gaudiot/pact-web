# PACT

**PACT (Portal Administrativo de Centro de Treinamento)** is a training center administration portal. It is intended to help training centers organize their daily operations in one place.

This repository, `pact-web`, contains the web application built with Next.js and React. All interface development follows a mobile-first approach, with layouts designed for small screens before adapting to tablets and desktops.

## Product scope

The portal is intended for training center staff to manage:

- **Students:** the student list and student information.
- **Payments:** student payment records and payment tracking.
- **Teachers:** teacher information and the teaching staff list.
- **Class locations:** the places where classes take place.

Additional administrative workflows may be introduced as requirements are defined. Payment processing, billing rules, class scheduling, user roles, and relationships between records must be clarified before implementation rather than assumed.

## Current status

The application is at the initial scaffold stage and currently displays the Next.js starter page. The areas listed above describe the intended product scope; they are not implemented features. Backend services, persistence, authentication, and payment integrations have not been established in this repository.

The `/plans` page displays a responsive list of payment plans with title, description, and example BRL prices. It uses local mock data and explicit pagination (three plans per page), with Previous, numbered page, and Next controls below the list. Server data integration and plan management are not implemented.

The `/users` page displays fictional user names only, with a name search debounced by 350 ms and explicit pagination (five users per page). Matching ignores case and accents. Changing the search resets to the first page; clearing it restores the list. Backend integration is not implemented.

The shared header links to `/users` and `/plans`, highlights the current page, and offers a hamburger disclosure menu on mobile. Escape closes the mobile menu and returns focus to its button; navigating closes the menu. Existing Clerk authentication controls remain available in the header.

## Technology stack

- Next.js with the App Router
- React
- TypeScript
- Tailwind CSS
- ESLint

See `package.json` and `package-lock.json` for dependency versions and available scripts.

## Local development

Install dependencies and start the development server from the project root:

```bash
npm ci
npm run dev
```

Open http://localhost:3000 in your browser.

Available commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Create a production build. |
| `npm start` | Run the production server after building. |

## Project structure

- `app/page.tsx`: the current home page.
- `app/layout.tsx`: the root layout, fonts, and page metadata.
- `app/globals.css`: global styles.
- `public/`: static assets.
- `AGENTS.md`: project context and development instructions for agents.
- `.codex/agents/code-reviewer.toml`: the project-specific review agent.

## Development guidelines

- Follow the mobile-first, accessibility, and framework guidance in `AGENTS.md`.
- Consult the installed Next.js documentation in `node_modules/next/dist/docs/` before writing code, as required by `AGENTS.md`.
- Keep changes focused on the requested administrative workflow and follow existing project patterns.
- Separate confirmed requirements from proposed features. Ask the user about missing business rules; use public documentation for technical questions when local information is insufficient.
- Keep student, teacher, and payment information private. Avoid including real personal or financial data in examples, fixtures, or logs.
