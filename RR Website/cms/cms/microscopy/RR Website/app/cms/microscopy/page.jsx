import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MicroscopyPage() {
  const data = await prisma.microscopyAnalysis.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">Microscopy</h1>

      <div className="border border-white/10 rounded-lg divide-y divide-white/10">
        {data.length === 0 && (
          <p className="p-6 text-white/60">No microscopy scans yet.</p>
        )}

        {data.map((m) => (
          <div key={m.id} className="p-6">
            <img
              src={m.imageUrl}
              alt="Microscopy"
              className="w-64 rounded mb-4"
            />

            <p className="text-white/60">
              {new Date(m.createdAt).toLocaleString("en-GB")}
            </p>

            <p className="text-lg my-3">{m.report}</p>

            {m.customer && (
              <Link
                href={`/cms/customers/${m.customer.id}`}
                className="text-[rgb(212,175,55)]"
              >
                View customer →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
