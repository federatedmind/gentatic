---
title: "1. Getting Started"
chapter: 1
description: "Learn how to install and run GenTatic locally."
---

GenTatic is a lightning-fast, developer-friendly static site generator built with Next.js (App Router). It transforms your local Markdown files into a beautifully styled, statically exported website that you can host anywhere—from AWS S3 to Codeberg Pages—without needing a Node.js server.

Out of the box, it features SEO metadata generation, analytics integrations, and 10 premium CSS theme presets.

## Prerequisites

Before installing GenTatic, ensure you have the following installed on your machine:
- Node.js (v18.17.0 or newer)
- npm (usually comes with Node.js)
- A code editor like VS Code

## Installation

First, clone the repository to your local machine and navigate into the directory. Then, install all the necessary dependencies by running:

```bash
npm install
```

This will download and install Next.js, along with the `gray-matter` and `remark` ecosystem plugins that power the markdown parsing engine.

## Local Development

To see GenTatic in action, start the local development server:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000). 

Next.js features hot-reloading out of the box. As you edit configuration files or write new Markdown posts, the site in your browser will automatically refresh to display the latest updates in real time.
