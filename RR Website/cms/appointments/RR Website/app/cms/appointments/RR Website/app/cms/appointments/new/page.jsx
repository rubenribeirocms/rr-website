import prisma from "@/lib/prisma";

export default async function NewAppointmentPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">New Appointment</h1>

      <form action="/api/appointments/create" method="POST" className="space-y-6 max-w-xl">
        {/* Customer */}
        <div>
          <label className="block mb-2 text-white/80">Customer</label>
          <select
            name="customerId"
            className="w-full p-3 bg-black border border-white/20 rounded"
          >
            <option value="">No customer (manual booking)</option>

            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Manual fields for non-customers */}
        <div>
          <label className="block mb-2 text-white/80">Name (if no customer)</label>
          <input className="w-full p-3 bg-black border border-white/20 rounded" name="name" />
        </div>

        <div>
          <label className="block mb-2 text-white/80">Email</label>
          <input type="email" className="w-full p-3 bg-black border border-white/20 rounded" name="email" />
        </div>

        <div>
          <label className="block mb-2 text-white/80">Phone</label>
          <input className="w-full p-3 bg-black border border-white/20 rounded" name="phone" />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 text-white/80">Date</label>
          <input
            type="datetime-local"
            name="date"
            required
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 text-white/80">Location</label>
          <select
            name="location"
            required
            className="w-full p-3 bg-black border border-white/20 rounded"
          >
            <option>London</option>
            <option>Dubai</option>
            <option>Kuwait</option>
            <option>Riyadh</option>
            <option>Abu Dhabi</option>
            <option>Lisbon</option>
            <option>Bahrain</option>
          </select>
        </div>

        {/* Treatment */}
        <div>
          <label className="block mb-2 text-white/80">Treatment</label>
          <input
            name="treatment"
            required
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block mb-2 text-white/80">Notes</label>
          <textarea
            name="notes"
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        <button
          className="px-6 py-3 bg-white text-black rounded hover:bg-[rgb(212,175,55)]"
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
}
