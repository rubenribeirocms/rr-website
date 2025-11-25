import prisma from "@/lib/prisma";

export default async function NewMicroscopyPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">Upload Microscopy</h1>

      <form
        action="/api/microscopy/create"
        method="POST"
        encType="multipart/form-data"
        className="space-y-6 max-w-xl"
      >
        {/* Customer */}
        <div>
          <label className="block mb-2 text-white/80">Customer</label>
          <select
            name="customerId"
            required
            className="w-full p-3 bg-black border border-white/20 rounded"
          >
            <option disabled selected>Select...</option>

            {customers.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 text-white/80">Image</label>
          <input
            type="file"
            name="image"
            required
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        {/* Report */}
        <div>
          <label className="block mb-2 text-white/80">Microscopy Report</label>
          <textarea
            name="report"
            className="w-full p-3 h-32 bg-black border border-white/20 rounded"
          />
        </div>

        <button className="px-6 py-3 bg-white text-black rounded hover:bg-[rgb(212,175,55)]">
          Upload
        </button>
      </form>
    </div>
  );
}
