import { getSortedPostsData } from '@/lib/markdown';
import { siteConfig } from '@/site.config';

export async function GET() {
  const posts = getSortedPostsData();

  const feedItems = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}/posts/${post.slug}</link>
      <guid>${siteConfig.url}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description || ''}]]></description>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title><![CDATA[${siteConfig.title}]]></title>
      <link>${siteConfig.url}</link>
      <description><![CDATA[${siteConfig.description}]]></description>
      <language>en</language>
      ${feedItems}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
