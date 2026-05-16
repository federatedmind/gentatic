---
title: "Blog Mode"
---

GenTatic features a powerful, fully-featured Blog Mode designed to showcase your content chronologically with rich metadata and gorgeous layouts.

## Overview

When `siteType` is set to `'blog'` in your `site.config.js`, GenTatic assumes that the target content directory is a flat collection of markdown files. It will automatically read all the files, sort them by the `date` specified in their frontmatter, and generate a unified, paginated feed on the homepage.

The blog mode supports pagination natively. The number of posts per page is controlled by the `postsPerPage` setting in your configuration. "Older Posts" and "Newer Posts" navigation links will automatically be generated at the bottom of the feed.

## Layout Options

You can completely alter the look of your blog feed by changing the `blogLayout` property in `site.config.js`:

### List Layout
Setting `blogLayout: 'list'` creates a traditional, vertical feed of posts. This is a clean, text-forward design that emphasizes the reading experience, with large titles and clear descriptions.

### Grid Layout
Setting `blogLayout: 'grid'` transforms the homepage into a modern, responsive card grid. This layout shines when your posts utilize cover images, creating a highly visual, premium browsing experience.

## Rich Metadata

GenTatic extracts rich metadata from your frontmatter to enhance the display of your posts:

### Cover Images
By specifying a `coverImage` in a post's frontmatter (e.g. `coverImage: "/images/hero.png"`), GenTatic will automatically render a beautiful hero banner at the top of the article. If you are using the Grid layout, this image will also be used as the thumbnail for the post card on the homepage!

### Authors
Give credit where credit is due by adding an `author` field to your frontmatter. This will display a dedicated byline on the post.

### Estimated Reading Time
GenTatic automatically analyzes the length of your markdown content during the build process and calculates an estimated reading time. This is displayed alongside the date on both the post card and the article header.

## Content Organization

### Tags
You can categorize your content by adding an array of `tags` to your frontmatter (e.g. `tags: ["nextjs", "tutorial"]`). 

These tags are rendered as clickable pills. Clicking on a tag will route the user to `/tags/[tag]`, which dynamically filters your feed to only show posts containing that specific tag.

### Featured Posts
Want to pin your best content to the top of the feed? Add `featured: true` to a post's frontmatter. This will attach a prominent "FEATURED" badge to the post and ensure it is always sorted to the very top of the homepage, regardless of its chronological date.

### Drafts
GenTatic supports a robust drafting workflow. By adding `draft: true` to a post's frontmatter, the post will be completely excluded from production builds (`next build`). 

However, drafts remain visible during local development (`next dev`), allowing you to preview your work-in-progress locally without the risk of accidentally publishing it.

## RSS Feeds

GenTatic automatically generates a standard RSS 2.0 XML feed containing all your published posts. This feed is available at `/feed.xml` and can be used by readers to subscribe to your blog using their favorite RSS reader.
