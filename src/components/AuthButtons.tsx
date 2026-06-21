"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-10 w-24 animate-pulse bg-slate-800 rounded-full"></div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-slate-100 text-xl font-bold uppercase hidden sm:flex">
          <User size={24} />
          <span>{session.user?.name || session.user?.email}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-6 py-2 border-4 border-slate-800 bg-red-600 hover:bg-red-500 text-white font-bold uppercase text-lg transition-all-smooth flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
        >
          Sair <LogOut size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="px-6 py-2 border-4 border-slate-800 bg-white text-slate-800 hover:bg-slate-200 font-bold uppercase text-lg transition-all-smooth shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
      >
        Entrar
      </Link>
      <Link
        href="/register"
        className="px-6 py-2 border-4 border-slate-800 bg-blue-500 hover:bg-blue-400 text-white font-bold uppercase text-lg transition-all-smooth shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
      >
        Cadastre-se
      </Link>
    </div>
  );
}
