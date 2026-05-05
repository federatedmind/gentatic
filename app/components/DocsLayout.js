import Link from 'next/link';

export default function DocsLayout({ postData, docsTree }) {
  return (
    <div className="docs-container max-w-8xl mx-auto px-4 sm:px-6 md:px-8 flex items-start">
      {/* Left Sidebar Navigation */}
      <aside className="docs-sidebar hidden lg:block sticky top-[3.8125rem] w-[19rem] h-[calc(100vh-3.8125rem)] overflow-y-auto py-10 pr-8 border-r border-slate-200 text-sm">
        <nav>
          {docsTree.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h5 className="mb-3 font-semibold text-slate-900 tracking-tight">{section.title}</h5>
              <ul className="space-y-2 border-l border-slate-100 dark:border-slate-800">
                {section.files.map((file, fIdx) => {
                  const isActive = postData.slug === file.slug;
                  return (
                    <li key={fIdx}>
                      <Link 
                        href={`/posts/${file.slug}`}
                        className={`block border-l -ml-px pl-4 ${
                          isActive 
                            ? 'text-blue-600 border-blue-600 font-semibold' 
                            : 'text-slate-600 hover:text-slate-900 border-transparent hover:border-slate-400'
                        }`}
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
      <main className="docs-content w-full lg:w-auto flex-auto min-w-0 lg:max-w-4xl lg:pl-[4rem] xl:pl-[6rem] pt-10 pb-24">
        <article className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          <h1>{postData.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>

        {/* Next / Prev Navigation */}
        <hr className="my-10 border-slate-200" />
        <div className="flex justify-between items-center text-sm font-medium leading-6 text-slate-700">
          {postData.prevPost ? (
            <Link href={`/posts/${postData.prevPost.slug}`} className="hover:text-slate-900 group flex items-center gap-2">
              <span aria-hidden="true">&larr;</span> 
              <div>
                <span className="block text-slate-400 group-hover:text-slate-500 text-xs uppercase tracking-wider mb-1">Previous</span>
                {postData.prevPost.title}
              </div>
            </Link>
          ) : <div />}
          
          {postData.nextPost ? (
            <Link href={`/posts/${postData.nextPost.slug}`} className="hover:text-slate-900 group flex items-center gap-2 text-right">
              <div>
                <span className="block text-slate-400 group-hover:text-slate-500 text-xs uppercase tracking-wider mb-1">Next</span>
                {postData.nextPost.title}
              </div>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : <div />}
        </div>
      </main>

      {/* Right Sidebar: On this page */}
      <aside className="docs-toc hidden xl:block w-[18rem] flex-none sticky top-[3.8125rem] h-[calc(100vh-3.8125rem)] overflow-y-auto pl-8 py-10 border-l border-slate-200">
        <h5 className="text-sm font-semibold text-slate-900 mb-4 tracking-tight">On this page</h5>
        <ul className="text-sm leading-6 text-slate-600">
          {postData.subChapters && postData.subChapters.map((ch, idx) => (
            <li key={idx} className="mb-2">
              <a href={`#${ch.slug}`} className="hover:text-slate-900 truncate block">{ch.title}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
