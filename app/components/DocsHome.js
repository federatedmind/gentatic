import Link from 'next/link';

export default function DocsHome({ docsTree }) {
  return (
    <section className="docs-home-toc">
      <h2>Table of Contents</h2>
      <div className="docs-home-grid">
        {docsTree.map((section, idx) => (
          <div key={idx} className="docs-home-section">
            <h3>{section.title}</h3>
            <ul className="docs-home-list">
              {section.files.map((file, fIdx) => (
                <li key={fIdx}>
                  <Link href={`/posts/${file.slug}`} className="docs-home-link">
                    {file.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
