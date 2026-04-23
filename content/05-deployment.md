---
title: "5. Deployment"
chapter: 5
description: "Learn how to deploy your generated static site to GitHub, Codeberg, and beyond."
---

GenTatic is specifically configured for **"Static Exports"** in Next.js. This means that instead of requiring a Node.js server to run on the internet, GenTatic parses all your Markdown files and generates a folder of pure, dumb HTML, CSS, and JS files. 

Because of this, you can host the output folder absolutely anywhere for free.

## 1. Build the Site

To generate your static files, run the build command locally or in your CI/CD pipeline:

```bash
npm run build
```

Once the process finishes, you will see a newly generated `out/` directory at the root of your project. This folder contains your entire website!

## 2. Host the `out/` Folder

### Option A: Using GitHub Actions (Automated)
You can configure GitHub to automatically build and deploy your site every time you push a new markdown file to the `main` branch.

1. In your GitHub repository, go to **Settings > Pages**.
2. Set the **Source** to "GitHub Actions".
3. Create a `.github/workflows/deploy.yml` file in your repository:

```yaml
name: Deploy GenTatic to GitHub Pages
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Option B: Codeberg Pages
Codeberg Pages serves files directly from a specific branch (usually named `pages` or `gh-pages`).

1. Build the site locally: `npm run build`
2. Push **only** the contents of the `out/` directory to a branch named `pages` in your Codeberg repository. (Pro tip: use the `gh-pages` npm package to automate this via `npx gh-pages -d out`).
3. Wait a few minutes for Codeberg's load balancers to update, and your site will be live at `https://<username>.codeberg.page/<repo-name>/`.

### Option C: Cloud Platforms (Vercel / Netlify / Cloudflare)
Connect your git repository directly to any of these modern edge platforms. 
- Set the Build Command to: `npm run build` 
- Set the Output Directory to: `out`

They will automatically detect the changes, build your site, and deploy it to a global CDN whenever you push.
