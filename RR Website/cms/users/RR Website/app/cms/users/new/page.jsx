export default function NewUserPage() {
  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">New User</h1>

      <form action="/api/users/create" method="POST" className="space-y-6 max-w-lg">
        {/* Name */}
        <div>
          <label className="block mb-2 text-white/80">Name</label>
          <input
            required
            name="name"
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-white/80">Email</label>
          <input
            required
            type="email"
            name="email"
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-white/80">Password</label>
          <input
            required
            type="password"
            name="password"
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 text-white/80">Role</label>
          <select
            name="role"
            className="w-full p-3 bg-black border border-white/20 rounded"
          >
            <option>Staff</option>
            <option>Admin</option>
          </select>
        </div>

        <button className="px-6 py-3 bg-white text-black rounded hover:bg-[rgb(212,175,55)]">
          Create User
        </button>
      </form>
    </div>
  );
}
