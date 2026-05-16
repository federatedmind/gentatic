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
      <ul className={`post-list ${siteConfig.blogLayout === 'grid' && siteConfig.siteType !== 'docs' ? 'post-grid' : ''}`}>
        {posts.map(({ slug, date, title, description, subChapters, coverImage, author, readingTime, tags, featured }) => (
          <li className={`post-card ${featured ? 'post-featured' : ''}`} key={slug}>
            <Link href={`/posts/${slug}`} className="post-card-link">
              {coverImage && (
                <div className="post-card-cover" style={{ backgroundImage: `url(${coverImage})` }}></div>
              )}
              {featured && <span className="badge badge-featured">Featured</span>}
              <h3>{title}</h3>
              <div className="post-card-meta-group">
                {author && <span className="post-author">{author}</span>}
                {date && <span className="post-date">{date}</span>}
                {readingTime && <span className="post-reading-time">{readingTime} min read</span>}
              </div>
              {description && <p className="post-card-desc">{description}</p>}
              
              {tags && tags.length > 0 && siteConfig.siteType !== 'docs' && (
                <div className="post-card-tags">
                  {tags.map(tag => (
                    <span key={tag} className="tag-pill">#{tag}</span>
                  ))}
                </div>
              )}

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
