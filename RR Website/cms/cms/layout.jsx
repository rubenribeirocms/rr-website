import Link from "next/link";
import "../globals.css";

export const metadata = {
  title: "CMS | Ruben Ribeiro",
};

export default function CMSLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black border-r border-white/10 p-6">
        <h1 className="text-2xl font-serif mb-10">
          <span className="gold">RR</span> CMS
        </h1>

        <nav className="space-y-4">
          <Link href="/cms" className="block hover:text-[rgb(212,175,55)]">
            Dashboard
          </Link>

          <Link href="/cms/customers" className="block hover:text-[rgb(212,175,55)]">
            Customers
          </Link>

          <Link href="/cms/appointments" className="block hover:text-[rgb(212,175,55)]">
            Appointments
          </Link>

          <Link href="/cms/microscopy" className="block hover:text-[rgb(212,175,55)]">
            Microscopy
          </Link>

          <Link href="/cms/invoices" className="block hover:text-[rgb(212,175,55)]">
            Invoices
          </Link>

          <Link href="/cms/users" className="block hover:text-[rgb(212,175,55)]">
            Users
          </Link>

          <form action="/api/logout" method="POST" className="pt-10">
            <button className="text-red-500 hover:text-red-300">Logout</button>
          </form>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
