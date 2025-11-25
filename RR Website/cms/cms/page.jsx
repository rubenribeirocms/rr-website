export default function CMSDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-serif mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 border border-white/10 rounded-lg">
          <h2 className="text-xl mb-2">Customers</h2>
          <p className="text-3xl gold">Live</p>
        </div>

        <div className="p-6 border border-white/10 rounded-lg">
          <h2 className="text-xl mb-2">Appointments</h2>
          <p className="text-3xl gold">Live</p>
        </div>

        <div className="p-6 border border-white/10 rounded-lg">
          <h2 className="text-xl mb-2">Microscopy</h2>
          <p className="text-3xl gold">Live</p>
        </div>
      </div>
    </div>
  );
}
