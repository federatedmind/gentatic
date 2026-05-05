import Link from 'next/link';

export default function DocsLayout({ postData, docsTree }) {
  return (
    <div className="docs-layout-container">
      {/* Left Sidebar Navigation */}
      <aside className="docs-left-sidebar">
        <nav className="docs-nav">
          {docsTree.map((section, idx) => (
            <div key={idx} className="docs-nav-section">
              <h5 className="docs-nav-heading">{section.title}</h5>
              <ul className="docs-nav-list">
                {section.files.map((file, fIdx) => {
                  const isActive = postData.slug === file.slug;
                  return (
                    <li key={fIdx} className="docs-nav-item">
                      <Link 
                        href={`/posts/${file.slug}`}
                        className={`docs-nav-link ${isActive ? 'active' : ''}`}
                      >
                        {file.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="docs-main-content">
        <article className="post-content docs-prose">
          <h1 className="docs-page-title">{postData.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>

        {/* Next / Prev Navigation */}
        <hr className="docs-divider" />
        <div className="docs-pagination">
          {postData.prevPost ? (
            <Link href={`/posts/${postData.prevPost.slug}`} className="docs-page-link docs-prev">
              <span className="docs-page-label">Previous</span>
              <span className="docs-page-title-sm">&larr; {postData.prevPost.title}</span>
            </Link>
          ) : <div />}
          
          {postData.nextPost ? (
            <Link href={`/posts/${postData.nextPost.slug}`} className="docs-page-link docs-next">
              <span className="docs-page-label">Next</span>
              <span className="docs-page-title-sm">{postData.nextPost.title} &rarr;</span>
            </Link>
          ) : <div />}
        </div>
      </main>

      {/* Right Sidebar: On this page */}
      <aside className="docs-right-sidebar">
        <h5 className="docs-toc-heading">On this page</h5>
        <ul className="docs-toc-list">
          {postData.subChapters && postData.subChapters.map((ch, idx) => (
            <li key={idx} className="docs-toc-item">
              <a href={`#${ch.slug}`} className="docs-toc-link">{ch.title}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
