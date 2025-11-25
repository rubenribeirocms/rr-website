export const metadata = {
  title: "Contact | Ruben Ribeiro",
};

export default function ContactPage() {
  return (
    <main className="px-10 py-20 max-w-3xl mx-auto">

      <h1 className="text-4xl font-serif mb-10">
        Contact
      </h1>

      <p className="text-white/60 mb-10 leading-relaxed">
        For press, partnerships or private client enquiries, please use the form below.
      </p>

      <form
        action="https://formsubmit.co/your-email-here"
        method="POST"
        className="space-y-8"
      >
        <input type="hidden" name="_captcha" value="false" />

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
            type="email"
            name="email"
            required
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 text-white/80">Message</label>
          <textarea
            name="message"
            className="w-full p-3 bg-black border border-white/20 rounded h-32"
          />
        </div>

        <button
          className="px-8 py-4 bg-white text-black rounded hover:bg-[rgb(212,175,55)]"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
