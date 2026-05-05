---
title: "Analytics Integration"
---

GenTatic supports Google Analytics and GoatTracker out of the box. Instead of hardcoding your IDs in the config file, it's recommended to define them via environment variables:

- `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXX`)
- `NEXT_PUBLIC_GOATTRACKER_URL` (e.g. `https://your-goattracker.com/count.js`)

The `<Analytics />` component automatically detects these variables and injects the proper tracking scripts into your `<head>` at build time.
