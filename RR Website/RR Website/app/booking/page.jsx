export const metadata = {
  title: "Booking | Ruben Ribeiro",
};

export default function BookingPage() {
  return (
    <main className="px-10 py-20 max-w-3xl mx-auto">

      <h1 className="text-4xl font-serif mb-10">
        Booking Enquiries
      </h1>

      <p className="text-white/60 mb-10 leading-relaxed">
        To request an appointment for a bespoke consultation or treatment,
        please submit the form below. Our team will contact you directly
        to confirm availability in London or international clinics.
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
          <label className="block mb-2 text-white/80">Phone</label>
          <input
            name="phone"
            className="w-full p-3 bg-black border border-white/20 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 text-white/80">Preferred Location</label>
          <select
            name="location"
            className="w-full p-3 bg-black border border-white/20 rounded"
          >
            <option>London</option>
            <option>Dubai</option>
            <option>Kuwait</option>
            <option>Riyadh</option>
            <option>Abu Dhabi</option>
            <option>Lisbon</option>
            <option>Bahrain</option>
          </select>
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
          Submit Request
        </button>
      </form>
    </main>
  );
}
