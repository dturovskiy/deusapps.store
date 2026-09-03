# Deus Apps Studio

Static website for **Deus Apps Studio** — an independent software studio building practical developer tools, platform infrastructure, Python/Linux automation, MCP and AI-assisted engineering workflows, TypeScript platform foundations, browser utilities, and selected 3D/game-development tools.

## Website

Live site:

https://dturovskiy.github.io/deusapps.store/

Public profiles, project pages, and channels for DeusApps.

## What this site includes

- Public project links and current GitHub work
- Android APK downloads for DeusApps utilities
- Static HTML/CSS/JavaScript assets
- Multilingual site UI
- GitHub Pages deployment workflow

## Project groups

- **armactl** — installer, manager, TUI, and optional Telegram bot for Arma Reforger Dedicated Server on Ubuntu.
- **Deus AI Limits Extension** — Chrome toolbar extension for monitoring Codex and Claude usage limits.
- **Deus Commit Chart** — GitHub Action for static 30/90/365-day contribution charts as README-safe SVGs, with GitHub contribution data, local Git support, and interactive HTML reports.
- **DeusApps Blender OBJ Importer Lite** — geometry-only Blender OBJ importer for SketchUp workflows.
- **MIA Platform** — TypeScript modular SaaS foundation.
- **Unity prototypes** — gameplay experiments and Unity/C# prototypes.
- **bear_data_export_bundle** — Python market-data export tooling.
- **Trading bot systems** — public bot/documentation/automation repositories.
- **NotesApp / CalculatorApp** — DeusApps Android utilities available as APK downloads.

## Project structure

```text
.
├── index.html
├── styles.css
├── script.js
├── translations.js
├── logo.svg
├── qr-code.png
├── images/
│   ├── favicon.svg
│   ├── NotesApp.svg
│   └── CalculatorApp.svg
├── downloads/
│   ├── NotesApp.apk
│   └── CalculatorApp.apk
└── .github/
    └── workflows/
        └── static.yml
```

## Local preview

From the repository root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

## Deployment

The site is deployed automatically to GitHub Pages using GitHub Actions.

Workflow:

```text
.github/workflows/static.yml
```

Expected Pages URL:

```text
https://dturovskiy.github.io/deusapps.store/
```

## Links

- Website: https://dturovskiy.github.io/deusapps.store/
- GitHub: https://github.com/dturovskiy
- LinkedIn Studio: https://www.linkedin.com/company/deusapps/
- LinkedIn: https://www.linkedin.com/in/denysturovskiy
- Threads: https://www.threads.com/@d.turovskiy?hl=uk
- Discord: https://discord.gg/UvWVVqKnYm

## Profiles

- GitHub: https://github.com/dturovskiy
- LinkedIn: https://www.linkedin.com/in/denysturovskiy
- Threads: https://www.threads.com/@d.turovskiy?hl=uk
- Discord: https://discord.gg/UvWVVqKnYm
- Telegram: shown on the website as a QR card

