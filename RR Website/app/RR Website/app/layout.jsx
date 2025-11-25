import "./globals.css";

export const metadata = {
  title: "Ruben Ribeiro | Bespoke Hair Restoration",
  description: "Luxury trichology and bespoke hair restoration treatments worldwide."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
