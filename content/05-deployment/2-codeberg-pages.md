---
title: "Codeberg Pages"
---

Codeberg Pages serves files directly from a specific branch (usually named `pages` or `gh-pages`).

1. Build the site locally: `npm run build`
2. Push **only** the contents of the `out/` directory to a branch named `pages` in your Codeberg repository. (Pro tip: use the `gh-pages` npm package to automate this via `npx gh-pages -d out`).
3. Wait a few minutes for Codeberg's load balancers to update, and your site will be live at `https://<username>.codeberg.page/<repo-name>/`.
