import Sidebar from "../components/Sidebar";

function Statistics() {
  const medicines =
    JSON.parse(localStorage.getItem("medicines")) || [];

  const appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  const profile =
    JSON.parse(localStorage.getItem("profile")) || {};

  const totalMedicines = medicines.length;

  const lowStockMedicines = medicines.filter(
    (medicine) => medicine.quantity <= 5
  ).length;

  const totalAppointments = appointments.length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.completed
  ).length;

  const upcomingAppointments =
    totalAppointments - completedAppointments;

  const healthScore = Math.min(
    100,
    70 +
      completedAppointments * 5 -
      lowStockMedicines * 3
  );

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">

      <h1 className="statistics-title">📊 Statistics</h1>

        <div className="summary-grid">

          <div className="summary-box">
  <div className="summary-icon">💊</div>
  <h2>{totalMedicines}</h2>
  <p>Total Medicines</p>
</div>

         <div className="summary-box">
  <div className="summary-icon">⚠️</div>
  <h2>{lowStockMedicines}</h2>
  <p>Low Stock</p>
</div>

          <div className="summary-box">
  <div className="summary-icon">📅</div>
  <h2>{totalAppointments}</h2>
  <p>Appointments</p>
</div>

          <div className="summary-box">
  <div className="summary-icon">✅</div>
  <h2>{completedAppointments}</h2>
  <p>Completed</p>
</div>

          <div className="summary-box">
  <div className="summary-icon">⏳</div>
  <h2>{upcomingAppointments}</h2>
  <p>Upcoming</p>
</div>

          <div className="summary-box">
  <div className="summary-icon">❤️</div>
  <h2>{healthScore}%</h2>
  <p>Health Score</p>
</div>

        </div>

        <div className="section-card">
          <h2>👤 Profile Summary</h2>

         <p>👤 <strong>Name:</strong> {profile.fullName || "Not Added"}</p>

<p>🎂 <strong>Age:</strong> {profile.age || "-"} Years</p>

<p>🩸 <strong>Blood Group:</strong> {profile.bloodGroup || "-"}</p>

<p>⚖️ <strong>Weight:</strong> {profile.weight || "-"} kg</p>
        </div>

      </div>
    </div>
  );
}

export default Statistics;