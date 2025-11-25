import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { date: "desc" },
    include: { customer: true }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">Invoices</h1>

      <Link
        href="/cms/invoices/new"
        className="px-4 py-2 bg-white text-black rounded hover:bg-[rgb(212,175,55)]"
      >
        + New Invoice
      </Link>

      <div className="mt-10 border border-white/10 rounded-lg divide-y divide-white/10">
        {invoices.length === 0 && (
          <p className="p-6 text-white/60">No invoices yet.</p>
        )}

        {invoices.map((inv) => (
          <div key={inv.id} className="p-6">
            <p className="text-xl">
              {inv.currency} {inv.total.toFixed(2)}
            </p>

            <p className="text-white/60 mt-1">
              Status: {inv.status}
            </p>

            <p className="text-white/40">
              {new Date(inv.date).toLocaleString("en-GB")}
            </p>

            <p className="mt-2 text-[rgb(212,175,55)]">
              {inv.customer ? (
                <Link href={`/cms/customers/${inv.customer.id}`}>
                  {inv.customer.name}
                </Link>
              ) : (
                "No customer"
              )}
            </p>

            <Link
              href={`/api/invoices/${inv.id}/pdf`}
              className="block mt-4 text-[rgb(212,175,55)] hover:underline text-sm"
            >
              Download PDF →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
