---
title: "3. Configuration"
chapter: 3
description: "Master the site.config.js file to control your site's identity and behavior."
---

The core settings for your GenTatic site are managed in a single, centralized file: `site.config.js`. You don't need to touch a single line of React code to set up your site's identity, SEO tags, or analytics!

## The Config Object

Here is a breakdown of the properties you can modify in `site.config.js`:

```javascript
export const siteConfig = {
  title: 'GenTatic',
  description: 'A lightning-fast, zero-config static site generator.',
  url: 'https://gentatic.com', 
  author: 'Federated Mind',
  
  postsPerPage: 10,
  logo: '/images/logo.png',
  
  siteType: 'docs',
  spacing: 'compact',
  theme: 'default',

  kicker: 'THE MODERN STATIC SITE GENERATOR',
  intro: 'A high-performance, zero-configuration static site generator powered by Next.js. Craft elegant documentation and blogs using Markdown, select from premium design themes, and deploy seamlessly anywhere.',
};
```

### Identity and SEO
- **`title`**: Used in the navigation header and as the base for all page `<title>` tags.
- **`description`**: The default fallback description used for OpenGraph and meta description tags.
- **`url`**: Crucial for generating absolute canonical URLs and valid OpenGraph image paths.
- **`logo`**: An optional absolute path to an image file (e.g. `'/images/logo.png'`). If provided, it renders beautifully next to the site title in the header.
- **`kicker`**: The small, uppercase subtitle that appears above the main title on the homepage hero section.
- **`intro`**: The descriptive paragraph that appears below the main title on the homepage hero section.

### Behavior
- **`postsPerPage`**: Controls the pagination logic on the homepage. If you have 15 posts and set this to `10`, GenTatic will automatically generate a `/page/2` containing the remaining 5 posts.
- **`siteType`**: Set to `'blog'` to sort posts by `date` (newest first). Set to `'docs'` to sort posts by the `chapter` frontmatter (ascending 1, 2, 3...).
- **`spacing`**: Set to `'compact'` to reduce vertical whitespace (ideal for docs), or `'relaxed'` for a more airy design (ideal for blogs). Leave empty to auto-select based on `siteType`.

### Analytics

GenTatic supports Google Analytics and GoatTracker out of the box. Instead of hardcoding your IDs in the config file, it's recommended to define them via environment variables:

- `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXX`)
- `NEXT_PUBLIC_GOATTRACKER_URL` (e.g. `https://your-goattracker.com/count.js`)

The `<Analytics />` component automatically detects these variables and injects the proper tracking scripts into your `<head>` at build time.
