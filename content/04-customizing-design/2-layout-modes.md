---
title: "Advanced CSS Variables"
---

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
