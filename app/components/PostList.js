import Link from 'next/link';
import { siteConfig } from '@/site.config';

export default function PostList({ posts, currentPage, totalPages }) {
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const prevPageUrl = currentPage === 2 ? '/' : `/page/${currentPage - 1}`;
  const nextPageUrl = `/page/${currentPage + 1}`;

  return (
    <section className="home-posts">
      <h2>{siteConfig.siteType === 'docs' ? 'Documentation' : 'Posts'}</h2>
      <ul className="post-list">
        {posts.map(({ slug, date, title, description, subChapters }) => (
          <li className="post-card" key={slug}>
            <Link href={`/posts/${slug}`} className="post-card-link">
              <h3>{title}</h3>
              {date && <p className="post-card-meta">{date}</p>}
              {description && <p className="post-card-desc">{description}</p>}
              <span className="post-card-cta">
                {siteConfig.siteType === 'docs' ? '>' : 'Read post \u2192'}
              </span>
            </Link>
            
            {siteConfig.siteType === 'docs' && subChapters && subChapters.length > 0 && (
              <ul className="sub-chapters-list">
                {subChapters.map(sub => (
                  <li key={sub.slug}>
                    <Link href={`/posts/${slug}#${sub.slug}`}>
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {(hasNextPage || hasPrevPage) && (
        <nav className="pagination-nav">
          {hasPrevPage ? (
            <Link href={prevPageUrl} className="pagination-link prev">
              &larr; Newer Posts
            </Link>
          ) : (
            <span className="pagination-link disabled">&larr; Newer Posts</span>
          )}
          
          <span className="pagination-current">
            Page {currentPage} of {totalPages}
          </span>

          {hasNextPage ? (
            <Link href={nextPageUrl} className="pagination-link next">
              Older Posts &rarr;
            </Link>
          ) : (
            <span className="pagination-link disabled">Older Posts &rarr;</span>
          )}
        </nav>
      )}
    </section>
  );
}
