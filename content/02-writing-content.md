---
title: "2. Writing Content"
chapter: 2
description: "Discover how to format your Markdown files and frontmatter."
---

All your posts and documentation pages live in the `content/` directory as flat `.md` files. 

By default, GenTatic is structured to read like a **blog or feed**. The generator reads this folder, sorts all files chronologically based on the `date` in their frontmatter, and generates a unified timeline on the Homepage. 

However, if you set `siteType: 'docs'` in your `site.config.js`, GenTatic will automatically change its sorting logic to read files sequentially based on a `chapter:` number!

## Frontmatter

Every markdown file must begin with YAML frontmatter. This metadata is used to generate the post listings, determine the ordering, and populate the SEO tags. 

> **Important:** Always ensure your titles are wrapped in quotes if they contain colons.

```yaml
---
title: "Your Post Title Here"
chapter: 2
date: 2026-04-10
description: A short description of what this post is about.
---
```

## Content and Assets

You can use standard Markdown syntax beneath the frontmatter. Code blocks will automatically receive beautiful, GitHub-dark inspired syntax highlighting thanks to `highlight.js`. 

Images should be placed in the `public/images/` directory (e.g., `public/images/my-image.png`). Because the `public/` folder maps directly to the root of your web server, you can then reference these images in your markdown like so:

```markdown
![My cool image](/images/my-image.png)
```

## Table of Contents (Auto-Index)

When GenTatic is running in `siteType: 'docs'` mode, it will automatically parse all the `##` level headings in your markdown files. 

It then uses these headings to instantly generate a beautiful, nested **Table of Contents** underneath your chapter cards on the homepage! Not only that, but GenTatic automatically injects URL-friendly `id` attributes into these headings, so clicking a link on the homepage scrolls the reader directly to the right section.

## Internal Linking

To link to another post, simply use the slug (the filename without the `.md` extension). For example, if you have a file named `03-configuration.md`, you can link to it like this:

```markdown
Check out the [Configuration Guide](/posts/03-configuration).
```
