import Link from "next/link";

export default function WhatsAppPage() {
  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-12">
      <div className="mx-auto max-w-lg">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
          ← Home
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900">WhatsApp</h1>
        <p className="mt-1 text-zinc-600">
          DM, gruppi — export PNG bolle trasparenti e singola bolla
        </p>
        <div className="mt-8 grid gap-4">
          <Link
            href="/whatsapp/dm"
            className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-emerald-500 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-[#25D366]">Chat DM</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Conversazione uno a uno con bolle e spunte lettura
            </p>
          </Link>
          <Link
            href="/whatsapp/group"
            className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-emerald-500 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-[#25D366]">Gruppo</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Chat di gruppo con più mittenti
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
