import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_JP } from "next/font/google";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexSansJP = IBM_Plex_Sans_JP({
  variable: "--font-plex-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI COMPOSITE KNOWLEDGE LAB // QUQULA89",
  description: "Obsidian Knowledge Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${plexMono.variable} ${plexSansJP.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between font-mono text-sm tracking-wider">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-[var(--cyan)] rounded-full animate-pulse"></div>
            <span className="text-[var(--cyan)]">SYS.ONLINE</span>
          </div>
          <div className="text-[var(--ink-dim)]">QUQULA89 {"//"} KNOWLEDGE_DB</div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 px-6 py-4 text-center font-mono text-xs text-[var(--ink-faint)]">
          &copy; {new Date().getFullYear()} AI COMPOSITE KNOWLEDGE LAB. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
