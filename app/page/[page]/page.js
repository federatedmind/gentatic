import { getSortedPostsData } from '@/lib/markdown';
import { siteConfig } from '@/site.config';
import PostList from '@/app/components/PostList';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamicParams = false;

export async function generateStaticParams() {
  const allPostsData = getSortedPostsData();
  const totalPages = Math.ceil(allPostsData.length / siteConfig.postsPerPage);
  
  const paths = [];
  // Start from page 2, since page 1 is the root '/'
  for (let i = 2; i <= totalPages; i++) {
    paths.push({
      page: i.toString(),
    });
  }
  // Workaround for Next.js build error when paths is empty
  if (paths.length === 0) {
    return [{ page: '2' }];
  }
  return paths;
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  return {
    title: `Page ${page}`,
    description: `Page ${page} of ${siteConfig.title}`,
  };
}

export default async function PaginatedHome({ params }) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);
  
  const allPostsData = getSortedPostsData();
  const totalPages = Math.ceil(allPostsData.length / siteConfig.postsPerPage);

  // Validate the page number
  if (isNaN(currentPage) || currentPage < 2) {
    notFound();
  }

  // Gracefully handle the dummy page 2 workaround
  if (currentPage > totalPages) {
    return null;
  }

  const startIndex = (currentPage - 1) * siteConfig.postsPerPage;
  const endIndex = startIndex + siteConfig.postsPerPage;
  const posts = allPostsData.slice(startIndex, endIndex);

  return (
    <>
      <section className="home-hero" style={{ marginBottom: '2rem' }}>
        <h1 className="home-title" style={{ fontSize: '2rem' }}>
          <Link href="/" style={{ color: 'inherit' }}>{siteConfig.title}</Link>
        </h1>
      </section>

      <PostList 
        posts={posts} 
        currentPage={currentPage} 
        totalPages={totalPages} 
      />
    </>
  );
}
