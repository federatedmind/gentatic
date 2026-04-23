import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import { siteConfig } from '@/site.config';

const postsDirectory = path.join(process.cwd(), 'content');

export function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  // Get file names under /content
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      const title = matterResult.data.title || slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      let dateString = matterResult.data.date || '';
      if (dateString instanceof Date) {
        dateString = dateString.toISOString().split('T')[0];
      }

      // Extract sub-chapters (## headings)
      const subChapters = [];
      if (siteConfig.siteType === 'docs') {
        const lines = fileContents.split('\n');
        let inCodeBlock = false;
        for (const line of lines) {
          if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
          }
          if (!inCodeBlock) {
            const match = line.match(/^##\s+(.*)$/);
            if (match) {
              const headingTitle = match[1].trim();
              const headingSlug = headingTitle.replace(/<[^>]+>/g, '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
              subChapters.push({ title: headingTitle, slug: headingSlug });
            }
          }
        }
      }

      // Combine the data with the slug
      return {
        slug,
        title,
        date: dateString,
        description: matterResult.data.description || '',
        subChapters,
        ...matterResult.data,
        date: dateString, // override the spread if it was a date object
      };
    });

  // Sort posts based on siteType
  return allPostsData.sort((a, b) => {
    if (siteConfig.siteType === 'docs') {
      // Sort by chapter number (ascending)
      const chapA = a.chapter || 999;
      const chapB = b.chapter || 999;
      return chapA - chapB;
    } else {
      // Sort by date (descending)
      if (a.date < b.date) {
        return 1;
      } else if (a.date > b.date) {
        return -1;
      } else {
        return 0;
      }
    }
  });
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ''),
      };
    });
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(highlight)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  
  let contentHtml = processedContent.toString();

  // Inject id attributes into <h2> tags so anchor links work
  if (siteConfig.siteType === 'docs') {
    contentHtml = contentHtml.replace(/<h2>(.*?)<\/h2>/g, (match, title) => {
      const plainTitle = title.replace(/<[^>]+>/g, '');
      const slug = plainTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      return `<h2 id="${slug}">${title}</h2>`;
    });
  }

  const title = matterResult.data.title || slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  let dateString = matterResult.data.date || '';
  if (dateString instanceof Date) {
    dateString = dateString.toISOString().split('T')[0];
  }

  const allPosts = getSortedPostsData();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  
  let nextPost = null;
  let prevPost = null;

  if (siteConfig.siteType === 'docs') {
    // Docs: Ascending (index 0 is chapter 1). Prev is index - 1, Next is index + 1.
    prevPost = currentIndex > 0 ? { slug: allPosts[currentIndex - 1].slug, title: allPosts[currentIndex - 1].title } : null;
    nextPost = currentIndex < allPosts.length - 1 ? { slug: allPosts[currentIndex + 1].slug, title: allPosts[currentIndex + 1].title } : null;
  } else {
    // Blog: Descending (index 0 is newest). Next is index - 1 (newer), Prev is index + 1 (older).
    nextPost = currentIndex > 0 ? { slug: allPosts[currentIndex - 1].slug, title: allPosts[currentIndex - 1].title } : null;
    prevPost = currentIndex < allPosts.length - 1 ? { slug: allPosts[currentIndex + 1].slug, title: allPosts[currentIndex + 1].title } : null;
  }

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    title,
    date: dateString,
    description: matterResult.data.description || '',
    nextPost,
    prevPost,
    ...matterResult.data,
    date: dateString, // override the spread if it was a date object
  };
}
