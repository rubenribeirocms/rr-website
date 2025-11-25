export default function NewCustomerPage() {
  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">New Customer</h1>

      <form action="/api/customers/create" method="POST" className="space-y-6 max-w-lg">
        <div>
          <label className="block mb-2 text-white/80">Name</label>
          <input
            name="name"
            required
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 text-white/80">Email</label>
          <input
            name="email"
            type="email"
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 text-white/80">Phone</label>
          <input
            name="phone"
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        <button
          className="px-6 py-3 bg-white text-black rounded hover:bg-[rgb(212,175,55)]"
        >
          Create
        </button>
      </form>
    </div>
  );
}
