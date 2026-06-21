"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, ArrowLeft } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou senha inválidos.");
      setLoading(false);
    } else {
      router.push("/teams");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-800 hover:text-slate-600 font-bold uppercase mb-6 transition-all-smooth bg-white px-4 py-2 border-4 border-slate-800 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
          <ArrowLeft size={20} /> Voltar
        </Link>
        <div className="gb-box p-8 w-full text-center">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 uppercase">Login</h1>
            <p className="text-slate-700 font-bold text-lg mt-1">Acesse sua conta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {error && (
              <div className="p-3 border-4 border-red-800 bg-red-200 text-red-900 font-bold text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xl font-bold text-slate-900 uppercase" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-100 border-4 border-slate-800 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all-smooth font-bold"
                placeholder="treinador@pokemon.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xl font-bold text-slate-900 uppercase" htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-100 border-4 border-slate-800 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all-smooth font-bold"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 border-4 border-slate-800 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase text-2xl transition-all-smooth flex justify-center items-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
            >
              {loading ? "..." : "Entrar"}
            </button>
          </form>

          <p className="mt-8 text-center text-lg font-bold text-slate-700">
            Ainda não tem conta?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-800 uppercase transition-all-smooth">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
