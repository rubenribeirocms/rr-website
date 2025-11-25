import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Ruben Ribeiro | Bespoke Hair Restoration",
  description: "Luxury trichology, personalised hair restoration and scalp health solutions.",
};

export default function PublicLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">

        {/* HEADER */}
        <header className="w-full border-b border-white/10 py-6 px-10 flex justify-between items-center">
          <Link href="/" className="text-3xl font-serif tracking-wide">
            <span className="text-[rgb(212,175,55)]">Ruben Ribeiro</span>
          </Link>

          <nav className="flex space-x-8 text-white/80">
            <Link href="/" className="hover:text-[rgb(212,175,55)]">Home</Link>
            <Link href="/booking" className="hover:text-[rgb(212,175,55)]">Booking</Link>
            <Link href="/contact" className="hover:text-[rgb(212,175,55)]">Contact</Link>
            <Link href="/login" className="hover:text-[rgb(212,175,55)]">Staff Login</Link>
          </nav>
        </header>

        {children}

        {/* FOOTER */}
        <footer className="border-t border-white/10 mt-20 py-10 text-center text-white/40">
          © {new Date().getFullYear()} Ruben Ribeiro. Bespoke Hair Restoration.
        </footer>
      </body>
    </html>
  );
}
