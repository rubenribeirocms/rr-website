import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">Users</h1>

      <Link
        href="/cms/users/new"
        className="px-4 py-2 bg-white text-black rounded hover:bg-[rgb(212,175,55)]"
      >
        + New User
      </Link>

      <div className="mt-10 border border-white/10 rounded-lg divide-y divide-white/10">
        {users.length === 0 && (
          <p className="p-6 text-white/60">No users found.</p>
        )}

        {users.map((u) => (
          <Link
            key={u.id}
            href={`/cms/users/${u.id}`}
            className="block p-6 hover:bg-white/5"
          >
            <p className="text-xl">{u.name}</p>
            <p className="text-white/60">{u.email}</p>
            <p className="text-white/40">
              Role: {u.role} {u.disabled ? "(Disabled)" : ""}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
