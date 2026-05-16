---
title: "Advanced CSS Variables"
---

GenTatic's entire design system is built using standard CSS variables, making it incredibly easy to customize without needing to learn complex Tailwind configurations or CSS-in-JS libraries.

## Understanding the CSS Structure

The visual presentation is primarily controlled by two files:
1. `app/themes.css`: Contains the definitions for all the built-in presets (e.g., `[data-theme="dracula"]`).
2. `app/globals.css`: Contains the structural layout styles and component definitions.

## Customizing Palettes

If you want to create your own custom color palette or tweak an existing one, you can simply override the CSS variables at the root level.

1. Open `app/globals.css`.
2. Look at the `@import './themes.css';` statement at the very top.
3. Define your own `:root` block below the import to override any variable globally.

### Cyberpunk Theme Example

To build a custom "Cyberpunk" theme from scratch, you could add this to the top of your `globals.css`:

```css
:root {
  --bg-color: #fcee0a;
  --text-color: #000000;
  --primary-color: #00f0ff;
  --card-bg: #1a1a1a;
  --card-border: #ff003c;
  --header-bg: rgba(252, 238, 10, 0.9);
}
```

GenTatic's entire layout system—from post cards to typography gradients—will automatically adapt to your new color variables!

## Component Overrides

Because GenTatic uses standard CSS, you can easily target specific components to override their appearance.

### The Home Grid
If you are using Blog Mode with the Grid layout, you can override the appearance of the post cards:

```css
.post-grid {
  gap: 3rem; /* Increase spacing */
}

.post-card-cover {
  border-radius: 12px 12px 0 0; /* Add rounded corners to images */
}
```
