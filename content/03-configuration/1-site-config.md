---
title: "Site Config Options"
---

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
  intro: 'A high-performance, zero-configuration static site generator...',
};
```

### Identity and SEO
- **`title`**: Used in the navigation header and as the base for all page `<title>` tags.
- **`description`**: The default fallback description used for OpenGraph and meta description tags.
- **`url`**: Crucial for generating absolute canonical URLs and valid OpenGraph image paths.
- **`logo`**: An optional absolute path to an image file.

### Behavior
- **`postsPerPage`**: Controls the pagination logic on the homepage (only applies when `siteType` is `'blog'`).
- **`siteType`**: Set to `'blog'` to sort posts by date and use a paginated feed. Set to `'docs'` to use the recursive sidebar tree layout and a dedicated Table of Contents homepage.
- **`spacing`**: Set to `'compact'` or `'relaxed'`.
