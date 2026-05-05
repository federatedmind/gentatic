# GenTatic

GenTatic is a lightning-fast, developer-friendly static site generator built with Next.js (App Router). It transforms your local Markdown files into a beautifully styled, statically exported website that you can host anywhere—from AWS S3 to Codeberg Pages—without needing a Node.js server.

Out of the box, it features SEO metadata generation, analytics integrations, and 10 premium CSS theme presets.

## Getting Started

### 1. Installation

First, clone the repository and install the dependencies:

```bash
npm install
```

### 2. Local Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. As you edit files or write new Markdown posts, the site will automatically update.

---

## Writing Content

### Structure & Format

GenTatic supports two distinct layout modes, configured via the `siteType` property in your `site.config.js`:

#### 1. Blog Mode (`siteType: 'blog'`)
By default, you can drop flat `.md` files directly into the `content/` directory. The generator will read this folder, sort all files chronologically based on the `date` in their frontmatter, and generate a unified timeline on the Homepage. Clicking a post navigates to `/posts/my-post`.

#### 2. Documentation Mode (`siteType: 'docs'`)
If you want to build a deeply technical **book** or **documentation site**, GenTatic supports **recursive, nested directories**. 

Simply structure your `content/` folder with sub-folders (e.g., `content/01-getting-started/1-installation.md`). GenTatic will automatically traverse the hierarchy, generate deep links (e.g., `/posts/01-getting-started/1-installation`), and build a collapsible, multi-level **Table of Contents sidebar** to easily navigate your chapters and sub-chapters!

### Frontmatter

Every markdown file must begin with YAML frontmatter. This metadata is used to generate the post listings and SEO tags. **Note:** Ensure your titles are wrapped in quotes if they contain colons.

```yaml
---
title: "Your Post Title Here"
date: 2026-04-10
description: A short description of what this post is about.
---
```

### Content and Assets

You can use standard Markdown syntax beneath the frontmatter. Code blocks will automatically receive syntax highlighting. 

Images should be placed in the `public/` directory (e.g., `public/images/my-image.png`). You can then reference them in your markdown like so:

```markdown
![My cool image](/images/my-image.png)
```

---

## Configuration

The core settings for your site are managed in a single file: `site.config.js`. You don't need to touch the React code to set up your site.

```javascript
export const siteConfig = {
  title: 'GenTatic',
  description: 'A lightning-fast, zero-config static site generator.',
  url: 'https://gentatic.com', 
  author: 'Federated Mind',
  
  postsPerPage: 10,
  logo: '/images/logo.png', // Optional header logo
  
  siteType: 'docs', // 'blog' (date sort) or 'docs' (chapter sort)
  spacing: 'compact', // 'compact' (less whitespace) or 'relaxed'
  theme: 'default',

  kicker: 'THE MODERN STATIC SITE GENERATOR',
  intro: 'A high-performance, zero-configuration static site generator powered by Next.js. Craft elegant documentation and blogs using Markdown, select from premium design themes, and deploy seamlessly anywhere.',
  // ...
};
```

### Analytics

GenTatic supports Google Analytics and GoatTracker out of the box. You can either hardcode your IDs in `site.config.js` or define them via environment variables:

- `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXX`)
- `NEXT_PUBLIC_GOATTRACKER_URL` (e.g. `https://your-goattracker.com/count.js`)

---

## Site Navigation

GenTatic automatically generates navigation to help users read your content:

### 1. Homepage Pagination
If you have more posts than the `postsPerPage` setting in `site.config.js`, GenTatic will automatically split your homepage into multiple pages (e.g., `/page/2`, `/page/3`). "Newer Posts" and "Older Posts" links will seamlessly guide readers through your feed.

### 2. Next/Previous Post Links
At the bottom of every article, GenTatic automatically generates "Previous" and "Next" links pointing to the chronologically adjacent posts, keeping readers engaged in your content flow.

---

## Customizing the Design

### 1. Built-in Theme Presets

GenTatic comes with 10 high-quality, pre-configured CSS themes. To switch themes, open `site.config.js` and change the `theme` property.

Available presets:
- `'default'`: Modern dark mode (GitHub-inspired)
- `'light-minimal'`: Clean, high-contrast light mode
- `'dark-ocean'`: Deep blue/teal dark mode
- `'dracula'`: Vibrant dark theme with pinks and purples
- `'solarized-light'`: Classic soft-yellow developer theme
- `'solarized-dark'`: Classic soft-teal developer theme
- `'monokai'`: Dark background with neon accents
- `'nord'`: Arctic, cold dark theme
- `'synthwave'`: Retro 80s neon dark theme
- `'forest'`: Nature-inspired light theme with soft greens

### 2. Advanced Styling

If you want to create your own color palette or tweak an existing one, the styling is managed entirely via CSS Variables.

1. Open `app/globals.css`.
2. Look at the variable definitions or the `@import './themes.css';`.
3. You can define your own `:root` block to override any variable (like `--bg-color` or `--primary-color`).

No complex CSS classes or build steps required.

---

## Deployment

GenTatic is configured for "Static Exports." This means Next.js will parse all your Markdown files and generate a folder of pure HTML, CSS, and JS. 

### 1. Build the Site

Run the build command:

```bash
npm run build
```

This will create an `out/` directory at the root of the project.

### 2. Hosting with GitHub Pages or Codeberg Pages

Since the `out/` folder is entirely static, it requires no backend to run, making it a perfect fit for Git Pages hosting.

#### Option A: Using GitHub Actions (Automated)
You can configure GitHub to automatically build and deploy your site every time you push to the `main` branch.

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

#### Option B: Codeberg Pages
Codeberg Pages serves files directly from a specific branch (usually `pages` or `gh-pages`).

1. Build the site locally: `npm run build`
2. The `out/` directory will be generated.
3. Push **only** the contents of the `out/` directory to a branch named `pages` in your Codeberg repository. (You can use tools like `gh-pages` npm package to automate this via `npx gh-pages -d out`).
4. Wait a few minutes for Codeberg's load balancers to update, and your site will be live at `https://<username>.codeberg.page/<repo-name>/`.

#### Option C: Cloud Platforms (Vercel / Netlify / Cloudflare)
Connect your repository to any of these platforms. Set the build command to `npm run build` and the output directory to `out`. They will automatically deploy your site whenever you push changes.
