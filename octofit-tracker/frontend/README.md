# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

For Codespaces, define `VITE_CODESPACE_NAME` in `.env.local` so the frontend can call the backend through the forwarded public URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API calls use:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the app safely falls back to local backend access at:

```text
http://localhost:8000/api/[component]/
```

## Commands

```bash
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
```
