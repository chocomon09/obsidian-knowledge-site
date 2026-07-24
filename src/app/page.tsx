import Link from "next/link";
import { getAllNotes } from "@/lib/notes";
import KnowledgeGraph from "@/components/KnowledgeGraph";

export default function Home() {
  const allNotes = getAllNotes();
  const compoundNotes = allNotes.filter(n => n.folder === 'compound').slice(0, 4);
  const outputNotes = allNotes.filter(n => n.folder === 'outputs');

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6 pb-4 relative">
        <div className="md:col-span-8 space-y-6">
          <p className="font-mono text-xs tracking-widest text-[var(--cyan)] uppercase">
            {"// AI COMPOSITE KNOWLEDGE LAB"}
          </p>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-cyan-glow text-[var(--cyan)] leading-tight">
            <span>知性を編み、</span><br />
            <span>概念を可視化する。</span>
          </h1>
          <p className="text-[var(--ink-dim)] font-mono max-w-xl text-sm md:text-base border-l-2 border-[var(--cyan-deep)] pl-4 leading-relaxed">
            QuQuLa89 の Obsidian セカンドブレインより抽出された複合統合知見マトリクス。
            法・聖書・哲学の多角的な交差検証レポートを蓄積。
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#featured" className="btn btn-primary">
              FEATURED INSIGHTS
            </a>
            <a href="#topology" className="btn btn-ghost">
              KNOWLEDGE TOPOLOGY
            </a>
          </div>
        </div>
        <div className="md:col-span-4 hidden md:block" aria-hidden="true">
          <div className="w-full max-w-[240px] ml-auto opacity-80">
            <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="100,6 30,58 100,90" fill="rgba(0,234,255,0.07)"/>
              <polygon points="100,90 52,164 100,234 148,164" fill="rgba(0,234,255,0.035)"/>
              <polygon points="100,6 170,58 148,164 100,234 52,164 30,58" stroke="#00eaff" strokeOpacity="0.6" strokeWidth="1"/>
              <path d="M100 6 L100 90 M30 58 L100 90 L170 58 M100 90 L52 164 M100 90 L148 164 M52 164 L148 164" stroke="#00eaff" strokeOpacity="0.3" strokeWidth="1"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Network Graph */}
      <section id="topology">
        <h2 className="text-xl font-mono text-[var(--cyan-soft)] mb-4 flex items-center gap-2">
          <span className="text-[var(--cyan)]">◈</span> [[ KNOWLEDGE_TOPOLOGY ]]
        </h2>
        <KnowledgeGraph />
      </section>

      {/* Featured Compound Notes */}
      <section id="featured">
        <h2 className="text-xl font-mono text-[var(--cyan-soft)] mb-4 border-b border-[var(--line-strong)] pb-2 inline-block pr-12">
          FEATURED_COMPOUND_INSIGHTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {compoundNotes.map(note => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="block group">
              <div className="bevel-card bevel-card-hover p-6 h-full transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--cyan)]/10 to-transparent -mr-10 -mt-10 rotate-45 pointer-events-none" />
                <div className="font-mono text-xs text-[var(--ink-dim)] mb-2 flex items-center gap-2">
                  <span className="text-[var(--cyan)]">SYS_ID:</span> {note.slug.split('_').pop()?.substring(0, 12)}
                  {note.created_at && <span>{"//"} {note.created_at}</span>}
                </div>
                <h3 className="text-lg font-sans font-bold text-[var(--ink)] group-hover:text-[var(--cyan-soft)] transition-colors mb-4">
                  {note.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {note.tags?.slice(0,3).map(tag => (
                    <span key={tag} className="text-xs font-mono bg-[var(--cyan-deep)]/20 text-[var(--cyan)] px-2.5 py-1 [clip-path:var(--bevel)]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Outputs List */}
      <section>
        <h2 className="text-xl font-mono text-[var(--cyan-soft)] mb-4 border-b border-[var(--line-strong)] pb-2 inline-block pr-12">
          ANALYSIS_OUTPUTS
        </h2>
        <div className="space-y-2 mt-6">
          {outputNotes.map(note => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="block group">
              <div className="flex items-center justify-between p-3.5 border border-[var(--line)] bg-[var(--bg-raised)] group-hover:border-[var(--cyan-deep)] transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-[var(--cyan)] font-mono">»</span>
                  <span className="font-sans text-[var(--ink)] group-hover:text-[var(--cyan-soft)] transition-colors">
                    {note.title}
                  </span>
                </div>
                <div className="flex gap-2">
                  {note.tags?.slice(0,2).map(tag => (
                    <span key={tag} className="text-xs font-mono text-[var(--ink-dim)] border border-[var(--line)] px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

