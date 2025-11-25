import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Login | RR CMS",
};

export default async function LoginPage() {
  const session = await getSession();

  // If already logged in, go straight to the CMS dashboard
  if (session) {
    redirect("/cms");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-10">
      <div className="max-w-md w-full border border-white/10 bg-black/40 backdrop-blur-md p-10 rounded-xl">

        <h1 className="text-4xl font-serif mb-2 text-center">
          RR CMS Login
        </h1>

        <p className="text-white/60 text-center mb-10">
          Secure access to your Bespoke Hair Restoration system.
        </p>

        <form action="/api/login" method="POST" className="space-y-8">

          <div>
            <label className="block text-sm text-white/60 mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-black border border-white/10 px-4 py-3 rounded text-white
                         focus:border-[rgb(212,175,55)] outline-none"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-black border border-white/10 px-4 py-3 rounded text-white
                         focus:border-[rgb(212,175,55)] outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-white text-black rounded-md font-semibold
                       hover:bg-[rgb(212,175,55)] transition-colors"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}
