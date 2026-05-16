---
title: "Site Config Options"
---

Here is a complete breakdown of all the configurable properties in `site.config.js`:

## Identity and SEO

These properties control the global identity of your site and are essential for SEO and social sharing:

- **`title`**: Used in the navigation header and as the base for all page `<title>` tags.
- **`description`**: The default fallback description used for OpenGraph and meta description tags.
- **`url`**: Crucial for generating absolute canonical URLs, generating RSS feeds, and building valid OpenGraph image paths. Ensure you include `https://`.
- **`author`**: Global author name, used in footers and RSS feeds.
- **`logo`**: An optional absolute path to an image file (e.g., `'/images/logo.png'`). If omitted, the site will render the `title` as text.

## Core Behavior

These properties fundamentally alter how GenTatic discovers content and renders pages:

- **`siteType`**: Set to `'blog'` to sort posts by date and use a paginated feed. Set to `'docs'` to use the recursive sidebar tree layout and a dedicated Table of Contents homepage.
- **`contentDir`**: Set the name of the directory containing your markdown files (defaults to `'content'`). Useful for maintaining multiple distinct sites (e.g., `docs` and `blog`) within the same repository.
- **`postsPerPage`**: Controls the pagination limit on the homepage (only applies when `siteType` is `'blog'`).

## Design & Layout Toggles

Control the aesthetic presentation of your site:

- **`theme`**: The primary CSS variable preset (e.g., `'default'`, `'light-minimal'`, `'forest'`).
- **`darkTheme`**: The fallback theme to switch to when a user clicks the Dark Mode toggle (e.g., `'dark-ocean'`, `'dracula'`, `'synthwave'`).
- **`blogLayout`**: Set to `'list'` or `'grid'` to configure the layout of your posts on the blog homepage (only applies when `siteType` is `'blog'`).
- **`spacing`**: Set to `'compact'` (best for documentation) or `'relaxed'` (best for blogs).

## Homepage Content

You can easily customize the text that appears on the homepage banner without editing React code:

- **`kicker`**: The small, uppercase text that appears above the main title.
- **`intro`**: The descriptive paragraph that appears below the main title.

## Analytics

GenTatic supports built-in, zero-configuration analytics integrations:

- **`googleAnalyticsId`**: Your Google Analytics tracking ID (e.g., `G-XXXXXXXXXX`).
- **`goatTrackerUrl`**: Your GoatTracker endpoint URL (e.g., `https://your-goattracker.com/count.js`).
