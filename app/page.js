import { getSortedPostsData, getDocsTree } from '@/lib/markdown';
import { siteConfig } from '@/site.config';
import PostList from './components/PostList';
import DocsHome from './components/DocsHome';

export default function Home() {
  if (siteConfig.siteType === 'docs') {
    const docsTree = getDocsTree();
    return (
      <>
        <section className="home-hero">
          <h1 className="home-title">{siteConfig.title}</h1>
          <p className="home-kicker">{siteConfig.kicker}</p>
          <p className="home-intro">{siteConfig.intro}</p>
        </section>
        <DocsHome docsTree={docsTree} />
      </>
    );
  }

  // Blog mode logic
  const allPostsData = getSortedPostsData();
  const totalPages = Math.ceil(allPostsData.length / siteConfig.postsPerPage);
  
  // Page 1 gets the first N posts
  const posts = allPostsData.slice(0, siteConfig.postsPerPage);

  return (
    <>
      <section className="home-hero">
        <h1 className="home-title">{siteConfig.title}</h1>
        <p className="home-kicker">{siteConfig.kicker}</p>
        <p className="home-intro">{siteConfig.intro}</p>
      </section>

      <PostList 
        posts={posts} 
        currentPage={1} 
        totalPages={totalPages} 
      />
    </>
  );
}
