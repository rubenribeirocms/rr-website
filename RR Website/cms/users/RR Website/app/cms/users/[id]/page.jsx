import prisma from "@/lib/prisma";

export default async function UserProfile({ params }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id }
  });

  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">{user.name}</h1>

      {/* EDIT FORM */}
      <form
        action={`/api/users/${user.id}/update`}
        method="POST"
        className="space-y-6 max-w-lg mb-10"
      >
        <div>
          <label className="block mb-2 text-white/80">Name</label>
          <input
            name="name"
            defaultValue={user.name}
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 text-white/80">Role</label>
          <select
            name="role"
            defaultValue={user.role}
            className="w-full p-3 bg-black border border-white/20 rounded"
          >
            <option>Staff</option>
            <option>Admin</option>
          </select>
        </div>

        <button className="px-6 py-3 bg-white text-black rounded hover:bg-[rgb(212,175,55)]">
          Save Changes
        </button>
      </form>

      {/* DISABLE USER */}
      {!user.disabled ? (
        <form action={`/api/users/${user.id}/disable`} method="POST">
          <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-400">
            Disable User
          </button>
        </form>
      ) : (
        <p className="text-red-400">This user is disabled.</p>
      )}
    </div>
  );
}
