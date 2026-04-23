import { getSortedPostsData } from '@/lib/markdown';
import { siteConfig } from '@/site.config';
import PostList from './components/PostList';

export default function Home() {
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
