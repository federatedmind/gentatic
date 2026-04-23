---
title: "4. Customizing the Design"
chapter: 4
description: "Switch themes instantly or build your own custom aesthetics using CSS Variables."
---

GenTatic is designed to look gorgeous out of the box. We bypass the complexity of utility-class frameworks like Tailwind CSS in favor of a powerful, pure Vanilla CSS variable system. 

## Built-in Theme Presets

GenTatic comes with 10 high-quality, pre-configured CSS themes built right into `app/themes.css`. To switch themes, simply open `site.config.js` and change the `theme` property.

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

**How it works:** The `layout.js` file automatically attaches `data-theme="your-theme"` to the root `<html>` element. The `themes.css` file then injects the exact color palette for that theme into the CSS variables.

## Advanced Styling

If you want to create your own custom color palette, or tweak an existing one, you can easily override the CSS variables.

1. Open `app/globals.css`.
2. Look at the variable definitions or the `@import './themes.css';` at the very top.
3. You can define your own `:root` block below the import to override any variable globally.

For example, to build a custom "Cyberpunk" theme, you could add:

```css
:root {
  --bg-color: #fcee0a;
  --text-color: #000000;
  --primary-color: #00f0ff;
  --card-bg: #1a1a1a;
  --card-border: #ff003c;
}
```

GenTatic's entire layout system—from post cards to typography gradients—will automatically adapt to your new color variables!

> **Best Part:** Because GenTatic relies on pure Vanilla CSS variables, there are **no build steps required** for styling. You don't have to wait for Tailwind or Sass to compile. Just hit save and refresh your browser!
