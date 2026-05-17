import { GradientCard } from "@/components/shared/GradientCard";
import { PageShell } from "@/components/shared/PageShell";
import { platforms } from "@/lib/platforms";

export default function Home() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-12 sm:py-16">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/80">
            Viral Club — Tool agenzia
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
              Mock social
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-600 bg-clip-text text-transparent">
              pronti in un click
            </span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Chat, DM, commenti e post finti per presentazioni e pitch.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <GradientCard
              key={p.id}
              href={p.href}
              title={p.name}
              description={p.description}
              brand={p.id}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
