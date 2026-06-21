import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import AuthButtons from "@/components/AuthButtons";

const retroFont = VT323({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Battle Dex",
  description: "Traduza os ataques e otimize seus times durante a partida.",
  referrer: "no-referrer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${retroFont.className} antialiased min-h-screen flex flex-col bg-slate-700 text-slate-100 retro-theme`} style={{ backgroundImage: "radial-gradient(#94a3b8 2px, transparent 2px)", backgroundSize: "16px 16px", backgroundAttachment: "fixed" }}>
        <Providers>
          <nav className="bg-slate-800 border-b-4 border-slate-900 shadow-[0_4px_0_rgba(0,0,0,0.2)] w-full p-4 sticky top-0 z-50 flex justify-between items-center px-4 sm:px-8">
            <div className="font-bold text-3xl uppercase tracking-tight text-white flex items-center gap-2 drop-shadow-md">
              <span className="text-yellow-400">Battle</span> Dex
            </div>
            <div className="flex gap-4">
              <AuthButtons />
            </div>
          </nav>
          <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
