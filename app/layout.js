import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { siteConfig } from '@/site.config';
import Analytics from './components/Analytics';
import 'highlight.js/styles/github-dark.css';
import { ThemeProvider } from './components/ThemeProvider';
import ThemeToggle from './components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const spacingAttr = siteConfig.spacing || (siteConfig.siteType === 'docs' ? 'compact' : 'relaxed');

  return (
    <html lang="en" suppressHydrationWarning data-spacing={spacingAttr}>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="layout-wrapper">
            <header className="site-header">
              <nav>
                <Link href="/" className="site-title">
                  {siteConfig.logo && (
                    <img src={siteConfig.logo} alt={siteConfig.title} className="site-logo" />
                  )}
                  {siteConfig.title}
                </Link>
              </nav>
              <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ThemeToggle />
              </div>
            </header>
            <main className={siteConfig.siteType === 'docs' ? 'docs-wrapper' : 'site-main'}>{children}</main>
          <footer className="site-footer">
            <p>&copy; {new Date().getFullYear()} {siteConfig.author}</p>
          </footer>
        </div>
        <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
