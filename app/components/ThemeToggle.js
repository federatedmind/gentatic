'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/site.config';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="theme-toggle-btn" aria-label="Toggle Dark Mode" style={{ visibility: 'hidden' }}>🌙</button>;
  }

  const toggleTheme = () => {
    if (theme === siteConfig.theme) {
      setTheme(siteConfig.darkTheme || 'dark-ocean');
    } else {
      setTheme(siteConfig.theme || 'default');
    }
  };

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Dark Mode">
      {theme === siteConfig.theme ? '🌙' : '☀️'}
    </button>
  );
}
