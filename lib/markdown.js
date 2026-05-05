import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import highlight from 'remark-highlight.js';
import { siteConfig } from '@/site.config';

const postsDirectory = path.join(process.cwd(), 'content');

// Helper to recursively get all markdown files
function getAllMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

export function getSortedPostsData() {
  const allFiles = getAllMarkdownFiles(postsDirectory);
  
  const allPostsData = allFiles.map((filePath) => {
    const relativePath = path.relative(postsDirectory, filePath);
    // Remove .md
    const idPath = relativePath.replace(/\.md$/, '');
    // Convert path to array of slugs
    const slugArray = idPath.split(path.sep);
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);
    
    // Fallback title: use the filename
    const fallbackTitle = slugArray[slugArray.length - 1].replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const title = matterResult.data.title || fallbackTitle;

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

    return {
      slugArray,
      slug: slugArray.join('/'),
      title,
      date: dateString,
      description: matterResult.data.description || '',
      subChapters,
      ...matterResult.data,
      date: dateString,
    };
  });

  return allPostsData.sort((a, b) => {
    if (siteConfig.siteType === 'docs') {
      // Sort alphabetically by path which sorts 01-getting-started before 02-core-concepts
      if (a.slug < b.slug) return -1;
      if (a.slug > b.slug) return 1;
      return 0;
    } else {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    }
  });
}

export function getAllPostSlugs() {
  const allFiles = getAllMarkdownFiles(postsDirectory);
  return allFiles.map((filePath) => {
    const relativePath = path.relative(postsDirectory, filePath);
    const idPath = relativePath.replace(/\.md$/, '');
    return {
      slug: idPath.split(path.sep),
    };
  });
}

// Extract Docs Tree Structure for Sidebar Navigation
export function getDocsTree() {
  const allPosts = getSortedPostsData();
  const tree = [];

  const map = {};

  allPosts.forEach(post => {
    if (post.slugArray.length === 1) {
      if (!map['/']) map['/'] = { title: 'Root', files: [] };
      map['/'].files.push(post);
    } else {
      const folderName = post.slugArray[0];
      if (!map[folderName]) map[folderName] = { title: folderName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), files: [] };
      map[folderName].files.push(post);
    }
  });

  for (const key in map) {
    if (key === '/') continue;
    
    const indexPost = map[key].files.find(p => p.slugArray.includes('index'));
    if (indexPost && indexPost.title) {
      map[key].title = indexPost.title;
    }
    
    // Sort files in folder
    map[key].files.sort((a, b) => {
      if (a.slugArray.includes('index')) return -1;
      if (b.slugArray.includes('index')) return 1;
      return a.slug.localeCompare(b.slug);
    });

    tree.push({
      folder: key,
      title: map[key].title,
      // Hide the index from the sub-links if it's the section header
      files: map[key].files.filter(p => !p.slugArray.includes('index'))
    });
  }

  return tree;
}

export async function getPostData(slugArray) {
  // Try finding the exact file or its index
  let fullPath = path.join(postsDirectory, ...slugArray) + '.md';
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, ...slugArray, 'index.md');
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  
  const processedContent = await remark()
    .use(highlight)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  
  let contentHtml = processedContent.toString();

  if (siteConfig.siteType === 'docs') {
    contentHtml = contentHtml.replace(/<h2>(.*?)<\/h2>/g, (match, title) => {
      const plainTitle = title.replace(/<[^>]+>/g, '');
      const idSlug = plainTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      return `<h2 id="${idSlug}">${title}</h2>`;
    });
    contentHtml = contentHtml.replace(/<h3>(.*?)<\/h3>/g, (match, title) => {
      const plainTitle = title.replace(/<[^>]+>/g, '');
      const idSlug = plainTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      return `<h3 id="${idSlug}">${title}</h3>`;
    });
  }

  const slugStr = slugArray.join('/');
  const title = matterResult.data.title || slugArray[slugArray.length - 1].replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  let dateString = matterResult.data.date || '';
  if (dateString instanceof Date) {
    dateString = dateString.toISOString().split('T')[0];
  }

  // Next and Prev Navigation Logic
  // Filter out index files from next/prev iteration so readers step through actual chapters
  const allPosts = getSortedPostsData().filter(p => !p.slugArray.includes('index') && p.slugArray.length > 1);
  const currentIndex = allPosts.findIndex((p) => p.slug === slugStr);
  
  let nextPost = null;
  let prevPost = null;

  if (currentIndex !== -1) {
    if (siteConfig.siteType === 'docs') {
      prevPost = currentIndex > 0 ? { slug: allPosts[currentIndex - 1].slug, title: allPosts[currentIndex - 1].title } : null;
      nextPost = currentIndex < allPosts.length - 1 ? { slug: allPosts[currentIndex + 1].slug, title: allPosts[currentIndex + 1].title } : null;
    } else {
      nextPost = currentIndex > 0 ? { slug: allPosts[currentIndex - 1].slug, title: allPosts[currentIndex - 1].title } : null;
      prevPost = currentIndex < allPosts.length - 1 ? { slug: allPosts[currentIndex + 1].slug, title: allPosts[currentIndex + 1].title } : null;
    }
  }

  return {
    slug: slugStr,
    slugArray,
    contentHtml,
    title,
    date: dateString,
    description: matterResult.data.description || '',
    nextPost,
    prevPost,
    ...matterResult.data,
    date: dateString,
  };
}
