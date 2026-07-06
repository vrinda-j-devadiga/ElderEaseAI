import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import API from "../api/axios";

function Statistics() {
const [medicines, setMedicines] = useState([]);
const [appointments, setAppointments] = useState([]);

useEffect(() => {
  const fetchStatistics = async () => {
    try {
      const [medicineRes, appointmentRes] =
        await Promise.all([
          API.get("/medicines"),
          API.get("/appointments"),
        ]);

      setMedicines(medicineRes.data);
      setAppointments(appointmentRes.data);

    } catch (error) {
      console.error(
        "Failed to fetch statistics:",
        error
      );
    }
  };

  fetchStatistics();
}, []);

const user =
  JSON.parse(localStorage.getItem("user")) || {};

  const totalMedicines = medicines.length;

  const lowStockMedicines = medicines.filter(
    (medicine) => medicine.quantity <= 5
  ).length;

  const totalAppointments = appointments.length;

 const completedAppointments =
  appointments.filter(
    (appointment) =>
      appointment.status === "Completed"
  ).length;

const upcomingAppointments =
  appointments.filter(
    (appointment) =>
      appointment.status === "Upcoming"
  ).length;

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

       <p>
  👤 <strong>Name:</strong> {user.name || "Not Added"}
</p>

<p>
  📧 <strong>Email:</strong> {user.email || "-"}
</p>

<p>
  🎂 <strong>Age:</strong> -
</p>

<p>
  🩸 <strong>Blood Group:</strong> -
</p>

<p>
  ⚖️ <strong>Weight:</strong> -
</p>

        </div>

      </div>
    </div>
  );
}

export default Statistics;