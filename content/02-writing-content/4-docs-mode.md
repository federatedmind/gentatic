---
title: "Docs Mode"
---

GenTatic's Docs Mode transforms the engine from a chronological blog into a structured, hierarchical documentation system, perfect for building technical manuals, books, or project wikis.

## Overview

When `siteType` is set to `'docs'` in your `site.config.js`, GenTatic fundamentally changes how it parses and presents your content. Instead of looking for a flat list of posts sorted by date, it looks for a **nested folder hierarchy** and sorts your content alphabetically by path.

## Directory Structure

In Docs Mode, the physical structure of your `content/` folder dictates the layout of the site. You can nest folders as deeply as you need to create chapters, sub-chapters, and sections.

### Organizing Chapters
To control the order of your chapters, you should prefix your folder and file names with numbers (e.g., `01-getting-started`, `02-core-concepts`). GenTatic will strip these numerical prefixes when generating the clean URLs (e.g., `/posts/getting-started`), but will use them to logically sort the table of contents.

### Index Files
Every directory in your documentation tree should contain an `index.md` file. This file serves as the landing page for that specific section or chapter. When a user clicks on a folder in the sidebar, they are navigated to its `index.md`.

## Automatic Navigation

GenTatic automatically generates complex navigation elements based on your nested folder structure, so you never have to manually update links.

### The Sidebar
GenTatic recursively traverses your entire content directory and builds a multi-level, collapsible **Table of Contents sidebar**. This sidebar is always visible on the left side of the screen, allowing users to quickly jump between chapters and deeply nested sections. 

The sidebar intelligently tracks the user's current location and automatically expands the relevant folders.

### The Homepage Grid
Instead of a paginated feed, the homepage in Docs mode is automatically replaced with a clean, responsive grid displaying all of your top-level chapters and sections. This serves as a high-level overview of the entire documentation site.

### Sequential Navigation
At the bottom of every article, GenTatic automatically generates "Previous" and "Next" links. In Docs mode, these links are exceptionally smart—they don't just point to the next file in the folder, they understand the entire nested hierarchy and will seamlessly guide a reader to the next logical chapter or sub-chapter, exactly as if they were reading a book from cover to cover.
