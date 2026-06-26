import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPills, FaCalendarAlt, FaHeartbeat } from "react-icons/fa";
import StatCard from "../components/StatCard";
import Sidebar from "../components/Sidebar";
import healthTips from "../data/healthTips";
import HealthTips from "../components/HealthTips";
import appointmentsData from "../data/appointments";
import Appointments from "../components/Appointments";
import "../styles/Dashboard.css";



function Dashboard() {

  const navigate = useNavigate();

const [activities, setActivities] = useState(() => {
  const savedActivities =
    localStorage.getItem("activities");

  return savedActivities
    ? JSON.parse(savedActivities)
    : [];
});
const [appointmentTitle, setAppointmentTitle] = useState("");
const [appointmentDate, setAppointmentDate] = useState("");
const [appointmentTime, setAppointmentTime] = useState("");

const [appointments, setAppointments] = useState(() => {
  const savedAppointments =
    localStorage.getItem("appointments");

  return savedAppointments
    ? JSON.parse(savedAppointments)
    : appointmentsData;
});


useEffect(() => {
  localStorage.setItem(
    "activities",
    JSON.stringify(activities)
  );
}, [activities]);

useEffect(() => {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}, []);


useEffect(() => {
  localStorage.setItem(
    "appointments",
    JSON.stringify(appointments)
  );
}, [appointments]);

const medicines =
  JSON.parse(localStorage.getItem("medicines")) || [];

const medicineCount = medicines.length;

const remainingMedicines =
  medicines.filter((medicine) => !medicine.taken).length;

const lowStockCount =
  medicines.filter(
    (medicine) =>
      medicine.quantity > 0 &&
      medicine.quantity <= 5
  ).length;

const appointmentCount = appointments.length;

const healthStatus = "Good";

const totalMedicines = medicines.length;

const takenMedicines =
  medicines.filter(
    (medicine) => medicine.quantity < 30
  ).length;

const progress =
  totalMedicines === 0
    ? 0
    : Math.round(
        (takenMedicines / totalMedicines) * 100
      );

const addAppointment = () => {

  if (
    !appointmentTitle ||
    !appointmentDate ||
    !appointmentTime
  ) {
    alert("Please fill all fields");
    return;
  }

  const newAppointment = {
    title: appointmentTitle,
    date: appointmentDate,
    time: appointmentTime
  };

  setAppointments([
    ...appointments,
    newAppointment
  ]);

  setActivities(prev => [
    `📅 Added appointment: ${appointmentTitle}`,
    ...prev
  ].slice(0, 5));

  setAppointmentTitle("");
  setAppointmentDate("");
  setAppointmentTime("");
};
const currentHour = new Date().getHours();

let greeting = "🌙 Good Night";

if (currentHour >= 5 && currentHour < 12) {
  greeting = "🌅 Good Morning";
} else if (currentHour >= 12 && currentHour < 17) {
  greeting = "☀️ Good Afternoon";
} else if (currentHour >= 17 && currentHour < 21) {
  greeting = "🌇 Good Evening";
}

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <div className="welcome-banner">

 <h1>{greeting}, Vrinda 👋</h1>

  <h3>Today's Summary</h3>

  <div className="summary-grid">

   <div
  className="summary-box"
  onClick={() => navigate("/medicines")}
>
      💊
      <h2>{remainingMedicines}</h2>
      <p>💊 Left Today</p>
    </div>

  <div
  className="summary-box"
  onClick={() => navigate("/appointments")}
>
      📅
      <h2>{appointmentCount}</h2>
      <p>📅 Upcoming</p>
    </div>

   <div
  className="summary-box"
  onClick={() => navigate("/medicines")}
>
      ⚠
      <h2>{lowStockCount}</h2>
      <p>⚠ Low Stock</p>
    </div>

  </div>

   <p className="daily-message">
  {lowStockCount > 0
    ? `⚠ ${lowStockCount} medicine(s) are running low.`
    : remainingMedicines === 0
    ? "🎉 Great job! You've completed today's medicines."
    : `💊 ${remainingMedicines} medicine(s) remaining today.`}
</p>

</div>

 <div className="progress-card">

  <h2>📊 Today's Progress</h2>

  <div className="progress-container">
    <div
      className="progress-fill"
      style={{
        width: `${progress}%`
      }}
    ></div>
  </div>

  <p className="progress-percent">
  {progress}%
</p>

<p className="progress-text">
  {progress === 100
    ? "🎉 Great job! You've completed today's medicines."
    : `💊 You've taken ${takenMedicines} of ${totalMedicines} medicines today.`}
</p>

</div>

        <div className="stats-container">

<StatCard
  icon={<FaPills />}
  title="Medicines Today"
  value={medicineCount}
/>

<StatCard
  icon={<FaCalendarAlt />}
  title="Appointments"
  value={appointmentCount}
/>

<StatCard
  icon={<FaHeartbeat />}
  title="Health Status"
  value={healthStatus}
/>

</div>

<div className="alert-container">

  {healthStatus === "Good" && (
    <div className="alert-success">
      ✅ Your health status looks good today!
    </div>
  )}

  {appointments.length > 0 && (
    <div className="alert-info">
      📅 You have upcoming appointments.
    </div>
  )}

</div>
     

<div className="section-card">

  <h2>📅 Add Appointment</h2>

  <div className="add-medicine">

    <input
      type="text"
      placeholder="Appointment Title"
      value={appointmentTitle}
      onChange={(e) =>
        setAppointmentTitle(e.target.value)
      }
    />

    <input
      type="date"
      value={appointmentDate}
      onChange={(e) =>
        setAppointmentDate(e.target.value)
      }
    />

    <input
      type="time"
      value={appointmentTime}
      onChange={(e) =>
        setAppointmentTime(e.target.value)
      }
    />

    <button onClick={addAppointment}>
      Add Appointment
    </button>

  </div>

</div>

<div className="dashboard-layout">

  <div className="left-column">

  </div>

  <div className="right-column">

    <HealthTips tips={healthTips} />

    <div className="section-card">

  <h2>📋 Recent Activity</h2>

  {activities.length === 0 ? (
    <p>No recent activity.</p>
  ) : (
    activities.map((activity, index) => (
  <div
  key={index}
  className={`activity-item ${
    activity.includes("Deleted")
      ? "delete-activity"
      : "add-activity"
  }`}
>
  {activity}
</div>
))
  )}

</div>

    <Appointments
  appointments={appointments}
/>

  </div>

</div>

      </div>

    </div>
    );
}

export default Dashboard;