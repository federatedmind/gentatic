import { getPostData, getAllPostSlugs } from '@/lib/markdown';
import { siteConfig } from '@/site.config';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  // Await the params object before accessing properties
  const { slug } = await params;
  try {
    const postData = await getPostData(slug);
    return {
      title: postData.title,
      description: postData.description || siteConfig.description,
      openGraph: {
        title: postData.title,
        description: postData.description || siteConfig.description,
        type: 'article',
        url: `${siteConfig.url}/posts/${slug}`,
        publishedTime: postData.date,
      },
    };
  } catch (e) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function Post({ params }) {
  // Await the params object
  const { slug } = await params;
  
  let postData;
  try {
    postData = await getPostData(slug);
  } catch (e) {
    notFound();
  }

  return (
    <article className="post-article">
      <header className="post-header">
        <h1 className="post-title">{postData.title}</h1>
        {postData.date && <p className="post-meta">{postData.date}</p>}
      </header>
      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />

      <nav className="post-navigation">
        <div className="nav-prev">
          {postData.prevPost && (
            <Link href={`/posts/${postData.prevPost.slug}`} className="nav-link">
              <span className="nav-label">&larr; Previous</span>
              <span className="nav-title">{postData.prevPost.title}</span>
            </Link>
          )}
        </div>
        <div className="nav-next">
          {postData.nextPost && (
            <Link href={`/posts/${postData.nextPost.slug}`} className="nav-link">
              <span className="nav-label">Next &rarr;</span>
              <span className="nav-title">{postData.nextPost.title}</span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
