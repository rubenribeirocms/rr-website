export default function HomePage() {
  return (
    <main className="px-10 pb-40">

      {/* HERO */}
      <section className="text-center pt-32 pb-20">
        <h1 className="text-6xl font-serif mb-6 leading-tight">
          <span className="text-[rgb(212,175,55)]">Bespoke Hair Restoration</span><br />
          by Ruben Ribeiro
        </h1>

        <p className="text-white/60 max-w-2xl mx-auto leading-relaxed text-lg">
          Precision trichology, elite scalp therapies and personalised treatment systems
          trusted by clients across London, Dubai, Kuwait and beyond.
        </p>

        <div className="mt-12">
          <a
            href="/booking"
            className="px-10 py-4 bg-white text-black text-lg rounded
                       hover:bg-[rgb(212,175,55)] transition-colors"
          >
            Book a Consultation
          </a>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="max-w-4xl mx-auto mt-24 text-center">
        <p className="text-white/80 text-xl leading-relaxed">
          With a unique fusion of advanced trichology, DNA hair analysis,
          polarised-light microscopy and bespoke clinical protocols,
          Ruben delivers some of the most sophisticated and results-driven
          hair restoration therapies in the world.
        </p>
      </section>
    </main>
  );
}
