'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { siteConfig } from '@/site.config';

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider 
      attribute="data-theme" 
      defaultTheme={siteConfig.theme || 'default'}
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
