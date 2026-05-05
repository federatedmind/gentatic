import { getPostData, getAllPostSlugs, getDocsTree } from '@/lib/markdown';
import { siteConfig } from '@/site.config';
import { notFound } from 'next/navigation';
import DocsLayout from '@/app/components/DocsLayout';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
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
        url: `${siteConfig.url}/posts/${slug.join('/')}`,
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
  const { slug } = await params;
  
  let postData;
  try {
    postData = await getPostData(slug);
  } catch (e) {
    notFound();
  }

  if (siteConfig.siteType === 'docs') {
    const docsTree = getDocsTree();
    return <DocsLayout postData={postData} docsTree={docsTree} />;
  }

  // Fallback for Blog layout
  return (
    <article className="post-article max-w-3xl mx-auto px-4 py-10">
      <header className="post-header mb-8">
        <h1 className="post-title text-4xl font-bold">{postData.title}</h1>
        {postData.date && <p className="post-meta text-gray-500 mt-2">{postData.date}</p>}
      </header>
      <div 
        className="post-content prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
      <nav className="post-navigation mt-10 pt-10 border-t flex justify-between">
        <div>
          {postData.prevPost && (
            <Link href={`/posts/${postData.prevPost.slug}`} className="text-blue-600 hover:underline">
              &larr; {postData.prevPost.title}
            </Link>
          )}
        </div>
        <div>
          {postData.nextPost && (
            <Link href={`/posts/${postData.nextPost.slug}`} className="text-blue-600 hover:underline">
              {postData.nextPost.title} &rarr;
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
