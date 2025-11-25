import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: "desc" },
    include: { customer: true }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">Appointments</h1>

      <Link
        href="/cms/appointments/new"
        className="px-4 py-2 bg-white text-black rounded hover:bg-[rgb(212,175,55)]"
      >
        + New Appointment
      </Link>

      <div className="mt-10 border border-white/10 rounded-lg divide-y divide-white/10">
        {appointments.length === 0 && (
          <p className="p-6 text-white/60">No appointments found.</p>
        )}

        {appointments.map((a) => (
          <div key={a.id} className="p-6">
            <p className="text-xl">{a.treatment}</p>
            <p className="text-white/60">{a.location}</p>

            <p className="text-white/40">
              {new Date(a.date).toLocaleString("en-GB")}
            </p>

            {a.customer && (
              <p className="mt-2 text-[rgb(212,175,55)]">
                <Link href={`/cms/customers/${a.customer.id}`}>
                  {a.customer.name}
                </Link>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
