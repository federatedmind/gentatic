---
title: "Frontmatter"
---

Every markdown file should start with a YAML frontmatter block to define its metadata. GenTatic reads this block to automatically populate SEO tags, titles, dates, and rich features like cover images and tags.

## Core Properties

These are the primary properties you should include in almost every file:

- **`title`**: (Required) Used for the main `<h1>` tag on the page and the browser tab `<title>` tag. If your title contains a colon (`:`), be sure to wrap the entire string in quotes.
- **`description`**: A short, text-only summary of the post. This is injected into the HTML `<meta name="description">` tag to ensure your content looks great when shared on social media or parsed by search engines.
- **`date`**: A standard date string (e.g., `2026-05-15`). If your GenTatic instance is configured to use Blog Mode, this date is used to sort the posts on the homepage chronologically.

## Blog Specific Properties

GenTatic's Blog Mode supports several rich metadata fields to enhance the reading experience. These properties are entirely optional.

- **`author`**: Renders a dedicated byline on the post (e.g., `author: "Ada Lovelace"`).
- **`coverImage`**: An absolute path or URL to an image. This image will be used as a large hero banner at the top of the article. If you are using the Grid layout, it will also be used as the thumbnail for the post card on the homepage.
- **`tags`**: An array of string tags (e.g., `tags: ["nextjs", "tutorial"]`). These are rendered as clickable pills that route to a dedicated tag page.
- **`featured`**: A boolean flag (`true` or `false`). If true, the post will receive a "FEATURED" badge and will automatically be pinned to the top of the homepage feed, regardless of its date.
- **`draft`**: A boolean flag (`true` or `false`). If true, the post will be completely hidden from production builds, but will remain visible while running the local `next dev` server.

## Visual Example

Here is a comprehensive example of what a fully-fleshed out frontmatter block looks like for a featured blog post:

```yaml
---
title: "Supercharging GenTatic Blog Mode"
date: "2026-05-15"
description: "A deep dive into the new features added to the blog layout."
coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
author: "Federated Mind"
tags: ["gentatic", "update", "nextjs"]
featured: true
---
```
