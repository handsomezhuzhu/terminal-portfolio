# handsomezhuzhu Terminal Portfolio

A terminal-style portfolio and link hub for `handsomezhuzhu`, a computer science undergraduate at Sun Yat-sen University. Built with React, TypeScript, Vite, and styled-components.

This fork is based on Sat Naing's MIT-licensed terminal portfolio template: https://github.com/satnaing/terminal-portfolio

## Features

- Responsive terminal UI
- Command history and autocomplete
- Multiple color themes
- PWA support
- Vitest + React Testing Library tests
- Centralized profile data in `src/config/profile.ts`

## Commands

- `help` lists available commands
- `welcome` displays the hero section
- `about` shows the profile intro
- `ls` lists files in the current virtual directory
- `cd <path>` changes the current virtual directory
- `cat <file>` prints a virtual file
- `open <.url-file>` opens a virtual URL file
- `projects` lists featured links and projects
- `projects go <project-no>` opens a project link
- `socials` lists useful links
- `socials go <social-no>` opens a link
- `email` shows and opens the configured email address
- `gui` opens the configured main profile URL
- `themes` lists themes
- `themes set <theme-name>` switches theme
- `history` shows command history
- `clear` clears the terminal

## Customize

Most personal data lives in one file:

```txt
src/config/profile.ts
```

Update these fields before deployment:

- `displayName`
- `role`
- `location`
- `siteUrl`
- `siteHost`
- `email`
- `projects`
- `socials`

Also replace the OG image and icons under `public/` when the final domain and brand assets are ready.

## Local Development

```bash
pnpm install
pnpm run dev
```

## Build

```bash
pnpm run build
```

## Test

```bash
pnpm run test:once
```

## Deploy

The project is a static Vite app. It can be deployed to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static server.
