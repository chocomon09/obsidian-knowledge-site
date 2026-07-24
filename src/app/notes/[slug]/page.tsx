import { notFound } from "next/navigation";
import { getNoteBySlug, getAllNotes } from "@/lib/notes";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-[var(--cyan-deep)] hover:text-[var(--cyan)] font-mono text-sm mb-8 transition-colors">
        <ArrowLeft size={16} /> RETURN_TO_SYSTEM
      </Link>

      <article className="bevel-card p-8 md:p-12 mb-12">
        <header className="mb-10 border-b border-[var(--line-strong)] pb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--cyan)] mb-4">
            <span className="bg-[var(--cyan-deep)]/20 px-2 py-1">SYS_ID: {note.slug.substring(0, 8)}</span>
            {note.created_at && <span className="border border-[var(--cyan-deep)]/30 px-2 py-1">CREATED: {note.created_at}</span>}
            {note.status && <span className="border border-[var(--cyan-deep)]/30 px-2 py-1 text-[var(--cyan-soft)]">STATUS: {note.status.toUpperCase()}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-[var(--ink)] mb-4 leading-tight">
            {note.title}
          </h1>
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.map(tag => (
                <span key={tag} className="text-sm font-mono text-[var(--ink-dim)] bg-[var(--bg)] px-2 py-1 border border-[var(--line)]">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-cyan max-w-none font-sans text-[var(--ink)] prose-headings:text-[var(--cyan-soft)] prose-headings:font-mono prose-a:text-[var(--cyan)] prose-a:no-underline hover:prose-a:underline prose-code:text-[var(--cyan-soft)] prose-code:font-mono prose-pre:bg-[var(--bg)] prose-pre:border prose-pre:border-[var(--line)]">
          <MDXRemote 
            source={note.content} 
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={{
              a: (props) => {
                const href = props.href || '';
                if (href.startsWith('/')) {
                  return <Link href={href} {...props} />;
                }
                return <a target="_blank" rel="noopener noreferrer" {...props} />;
              },
              h1: (props) => <h1 className="text-2xl font-bold mt-8 mb-4 border-b border-[var(--line)] pb-2" {...props} />,
              h2: (props) => <h2 className="text-xl font-bold mt-8 mb-4 border-l-2 border-[var(--cyan)] pl-3" {...props} />,
              h3: (props) => <h3 className="text-lg font-bold mt-6 mb-3 text-[var(--ink)]" {...props} />,
            }}
          />
        </div>
      </article>
    </div>
  );
}
