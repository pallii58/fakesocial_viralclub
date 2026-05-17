import Link from "next/link";
import { platforms } from "@/lib/platforms";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur px-4 py-8 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Fake Social
          </h1>
          <p className="mt-2 max-w-xl text-zinc-600">
            Crea screenshot di chat e commenti finti per presentazioni e mockup
            di agenzia. Esporta in PNG o JPG.
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Usa solo per demo autorizzate
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ backgroundColor: `${p.color}18` }}
              >
                {p.icon}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-zinc-900 group-hover:text-zinc-700">
                {p.name}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">{p.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
