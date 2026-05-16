import { getSortedPostsData, getAllTags } from '@/lib/markdown';
import { siteConfig } from '@/site.config';
import PostList from '@/app/components/PostList';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = getAllTags();
  if (tags.length === 0) {
    return [{ tag: 'empty' }];
  }
  return tags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}" | ${siteConfig.title}`,
    description: `All posts tagged with ${tag} on ${siteConfig.title}`,
  };
}

export default async function TagPage({ params }) {
  const { tag } = await params;
  
  const allPosts = getSortedPostsData();
  const filteredPosts = allPosts.filter(post => post.tags && post.tags.includes(tag));
  
  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <>
      <section className="home-hero">
        <h1 className="home-title">#{tag}</h1>
        <p className="home-intro">Posts tagged with "{tag}"</p>
      </section>

      <PostList 
        posts={filteredPosts} 
        currentPage={1} 
        totalPages={1} 
      />
    </>
  );
}
