export const siteConfig = {
  title: 'GenTatic',
  description: 'A lightning-fast, zero-config static site generator.',
  url: 'https://gentatic.com', // Replace with your actual domain
  author: 'GenTatic Team',
  postsPerPage: 10,
  // Optional logo to display in the header (e.g., '/images/logo.png'). Leave empty for text-only.
  logo: '/images/logo.png',
  // Set to 'blog' or 'docs'
  siteType: 'docs',
  // Spacing mode: 'compact' (less vertical whitespace) or 'relaxed' (more whitespace). 
  // 'compact' is recommended for docs.
  spacing: 'compact',
  // Options: 'default', 'light-minimal', 'dark-ocean', 'dracula', 'solarized-light', 'solarized-dark', 'monokai', 'nord', 'synthwave', 'forest'
  theme: 'default',
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '', // e.g. G-XXXXXXX
    goatTrackerUrl: process.env.NEXT_PUBLIC_GOATTRACKER_URL || '', // e.g. https://your-goattracker.com/count.js
  },
  // Kicker for the homepage
  kicker: 'THE MODERN STATIC SITE GENERATOR',
  // Intro text for the homepage
  intro: 'A high-performance, zero-configuration static site generator powered by Next.js. Craft elegant documentation and blogs using Markdown, select from premium design themes, and deploy seamlessly anywhere.',
};
