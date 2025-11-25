import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CustomerProfile({ params }) {
  const customer = await prisma.customer.findUnique({
    where: { id: params.id },
    include: {
      notes: { orderBy: { createdAt: "desc" } },
      microscopy: { orderBy: { createdAt: "desc" } },
      appointments: { orderBy: { date: "desc" } },
      invoices: { orderBy: { date: "desc" } }
    }
  });

  if (!customer) return <p>Customer not found</p>;

  return (
    <div>
      <h1 className="text-3xl font-serif">{customer.name}</h1>
      <p className="text-white/60">{customer.email}</p>
      <p className="text-white/60">{customer.phone}</p>

      <div className="grid grid-cols-2 gap-10 mt-10">
        {/* NOTES */}
        <div>
          <h2 className="text-2xl mb-4">Clinical Notes</h2>

          <form
            action="/api/notes/create"
            method="POST"
            className="mb-6"
          >
            <input type="hidden" name="customerId" value={customer.id} />
            <textarea
              name="content"
              required
              className="w-full h-32 p-3 bg-black border border-white/20 rounded"
              placeholder="Write a clinical note..."
            />
            <button className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-[rgb(212,175,55)]">
              Add Note
            </button>
          </form>

          <div className="space-y-4">
            {customer.notes.map((n) => (
              <div key={n.id} className="p-4 border border-white/10 rounded">
                <p>{n.content}</p>
                <p className="text-xs text-white/40 mt-2">
                  {new Date(n.createdAt).toLocaleString("en-GB")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MICROSCOPY */}
        <div>
          <h2 className="text-2xl mb-4">Microscopy</h2>

          <form
            action="/api/microscopy/create"
            method="POST"
            encType="multipart/form-data"
            className="mb-6"
          >
            <input type="hidden" name="customerId" value={customer.id} />

            <input type="file" name="image" required className="mb-3" />

            <textarea
              name="report"
              className="w-full h-32 p-3 bg-black border border-white/20 rounded"
              placeholder="Write a microscopy report..."
            />

            <button className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-[rgb(212,175,55)]">
              Upload
            </button>
          </form>

          <div className="space-y-4">
            {customer.microscopy.map((m) => (
              <div key={m.id} className="p-4 border border-white/10 rounded">
                <img
                  src={m.imageUrl}
                  alt="Microscopy"
                  className="w-full mb-3 rounded"
                />
                <p>{m.report}</p>
                <p className="text-xs text-white/40 mt-2">
                  {new Date(m.createdAt).toLocaleString("en-GB")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* APPOINTMENTS */}
        <div>
          <h2 className="text-2xl mb-4">Appointments</h2>

          <div className="space-y-4">
            {customer.appointments.map((a) => (
              <div key={a.id} className="p-4 border border-white/10 rounded">
                <p className="text-lg">{a.treatment}</p>
                <p className="text-white/60">{a.location}</p>
                <p className="text-white/40">
                  {new Date(a.date).toLocaleString("en-GB")}
                </p>
              </div>
            ))}

            <Link
              href="/cms/appointments"
              className="text-[rgb(212,175,55)]"
            >
              View all appointments →
            </Link>
          </div>
        </div>

        {/* INVOICES */}
        <div>
          <h2 className="text-2xl mb-4">Invoices</h2>

          <div className="space-y-4">
            {customer.invoices.map((inv) => (
              <div key={inv.id} className="p-4 border border-white/10 rounded">
                <p className="text-lg">
                  {inv.currency} {inv.total.toFixed(2)}
                </p>

                <p className="text-white/60">{inv.status}</p>

                <Link
                  className="text-[rgb(212,175,55)] text-sm"
                  href={`/api/invoices/${inv.id}/pdf`}
                >
                  Download PDF →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
