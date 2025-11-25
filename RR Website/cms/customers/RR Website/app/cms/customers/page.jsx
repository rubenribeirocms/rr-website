import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">Customers</h1>

      <Link
        href="/cms/customers/new"
        className="px-4 py-2 bg-white text-black rounded hover:bg-[rgb(212,175,55)]"
      >
        + New Customer
      </Link>

      <div className="mt-10 border border-white/10 rounded-lg divide-y divide-white/10">
        {customers.length === 0 && (
          <p className="p-6 text-white/60">No customers yet.</p>
        )}

        {customers.map((c) => (
          <Link
            key={c.id}
            href={`/cms/customers/${c.id}`}
            className="block p-6 hover:bg-white/5"
          >
            <p className="text-xl">{c.name}</p>
            <p className="text-white/60">{c.email}</p>
            <p className="text-white/60">{c.phone}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
