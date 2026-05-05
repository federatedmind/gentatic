import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { siteConfig } from '@/site.config';
import Analytics from './components/Analytics';
import 'highlight.js/styles/github-dark.css';

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
    <html lang="en" data-theme={siteConfig.theme || 'default'} data-spacing={spacingAttr}>
      <body className={inter.className}>
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
          </header>
          <main className={siteConfig.siteType === 'docs' ? 'docs-wrapper' : 'site-main'}>{children}</main>
          <footer className="site-footer">
            <p>&copy; {new Date().getFullYear()} {siteConfig.author}</p>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
