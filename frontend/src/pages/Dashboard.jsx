import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import healthTips from "../data/healthTips";
import HealthTips from "../components/HealthTips";
import API from "../api/axios";

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

const user =
  JSON.parse(localStorage.getItem("user")) || {};

const firstName =
  user.name
    ? user.name.split(" ")[0]
    : "User";

const [appointments, setAppointments] = useState([]);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
     const [medicineRes, appointmentRes, reminderRes] = await Promise.all([
  API.get("/medicines"),
  API.get("/appointments"),
  API.get("/medicines/reminders"),
]);

setMedicines(medicineRes.data);
setAppointments(appointmentRes.data);
setReminders(reminderRes.data);

      setMedicines(medicineRes.data);
      setAppointments(appointmentRes.data);

    } catch (error) {
  console.error("Failed to fetch dashboard data:", error);

  alert(
    error.response?.data?.message ||
    "Failed to load dashboard."
  );
}
  };

  fetchDashboardData();
}, []);

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

const [medicines, setMedicines] = useState([]);
const [reminders, setReminders] = useState([]);

const remainingMedicines = medicines.filter(
  (medicine) => medicine.status !== "Completed"
).length;

const lowStockCount =
  medicines.filter(
    (medicine) =>
      medicine.quantity > 0 &&
      medicine.quantity <= 5
  ).length;

const appointmentCount = appointments.length;

const healthStatus = "Good";

const upcomingAppointments = appointments
  .filter(
    (appointment) =>
      new Date(`${appointment.date}T${appointment.time}`) >= new Date()
  )
  .sort(
    (a, b) =>
      new Date(`${a.date}T${a.time}`) -
      new Date(`${b.date}T${b.time}`)
  );

const nextAppointment =
  upcomingAppointments.length > 0
    ? upcomingAppointments[0]
    : null;

const totalMedicines = medicines.length;

const completedMedicines = medicines.filter(
  (medicine) => medicine.status === "Completed"
).length;

const progress =
  totalMedicines === 0
    ? 0
    : Math.round(
        (completedMedicines / totalMedicines) * 100
      );


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

  <h1>{greeting}, {firstName} 👋</h1>

<p className="welcome-text">
    Welcome back! Here's your health overview for today.
</p>

  <div className="summary-grid">

    <div
      className="summary-box"
      onClick={() => navigate("/medicines")}
    >

      <div className="icon">💊</div>

<h2>{remainingMedicines}</h2>

<p>Medicines Left</p>
      
    </div>

    <div
      className="summary-box"
      onClick={() => navigate("/appointments")}
    >
        <div className="icon">📅</div>
      <h2>{appointmentCount}</h2>
      <p>Appointments</p>
    </div>

    <div
      className="summary-box"
      onClick={() => navigate("/medicines")}
    >
      
  <div className="icon">⚠️</div>

      <h2>{lowStockCount}</h2>
      <p>Low Stock</p>
    </div>

    <div className="summary-box">
       <div className="icon">📈</div>
      <h2>{progress}%</h2>
      <p>Today's Progress</p>
    </div>

  </div>

<p className="daily-message">
    {remainingMedicines === 0
        ? "🎉 Excellent! You've completed today's medicines."
        : `💚 Keep taking your medicines on time. ${remainingMedicines} remaining today.`}
</p>

</div>

<div className="dashboard-top">

  <div className="section-card">

    <h2>💊 Today's Medicines</h2>

    <p className="section-subtitle">
Take your medicines on time for better health.
</p>

{reminders.length === 0 ? (

  <p>No medicines added yet.</p>

) : (

  reminders.slice(0, 4).map((medicine) => (

    <div className="medicine-row" key={medicine._id}>

      <div className="medicine-info">

        <div className="medicine-icon">
          💊
        </div>

        <div>
          <h4>{medicine.name}</h4>

          <p>
            {medicine.status === "Due"
              ? "🔴 Due"
              : medicine.status === "Taken"
              ? "🟢 Taken"
              : "🟡 Upcoming"}
          </p>
        </div>

      </div>

      <span className="time-badge">
        🕒 {medicine.time}
      </span>

    </div>

  ))

)}
  </div>


  <div className="section-card">

  <h2>📅 Next Appointment</h2>

{nextAppointment ? (
  <>
    <p className="appointment-subtitle">
      Your upcoming doctor visit.
    </p>

    <div className="appointment-card">

  <h3>👨‍⚕️ {nextAppointment.doctorName}</h3>

  <p>
    <strong>🏥 Hospital:</strong>{" "}
    {nextAppointment.hospital}
  </p>

  <p>
    <strong>🩺 Department:</strong>{" "}
    {nextAppointment.department}
  </p>

  <p>
    <strong>📅 Date:</strong>{" "}
    {nextAppointment.date}
  </p>

  <p>
    <strong>🕒 Time:</strong>{" "}
    {nextAppointment.time}
  </p>

  {nextAppointment.notes && (
    <p>
      <strong>📝 Notes:</strong>{" "}
      {nextAppointment.notes}
    </p>
  )}

</div>

  </>
) : (
  <div
  className="no-appointment"
  onClick={() => navigate("/appointments")}
>

    <div className="empty-icon-circle">
    <div className="empty-icon">📅</div>
</div>

    <h3>No Upcoming Appointments</h3>

    <p>You're all caught up. Enjoy your day!</p>

  </div>
)}

  </div>

</div>
     
<div className="section-card">

  <h2>⚡ Quick Actions</h2>

  <div className="quick-actions">

     <div className="action-card" onClick={() => navigate("/medicines")}>

   <div className="action-icon-circle">
    <div className="action-icon">💊</div>
</div>

    <h3>Medicines</h3>

    <p>Manage your medicines</p>

    </div>

    <div
  className="action-card"
  onClick={() => navigate("/appointments")}
>

    <div className="action-icon-circle">
    <div className="action-icon">📅</div>
</div>

    <h3>Appointments</h3>

    <p>View appointments</p>

</div>

    <div
  className="action-card"
  onClick={() => navigate("/ai")}
>

    <div className="action-icon-circle">
    <div className="action-icon">🤖</div>
</div>

    <h3>AI Assistant</h3>

    <p>Ask health questions</p>

</div>

   <div
  className="action-card"
  onClick={() => navigate("/reports")}
>

  <div className="action-icon-circle">
    <div className="action-icon">📄</div>
</div>

    <h3>Reports</h3>

    <p>View health reports</p>

</div>
  </div>

</div>

<div className="dashboard-layout">

    <HealthTips tips={healthTips} />

    <div className="section-card">

        <h2>📋 Recent Activity</h2>

   {activities.length === 0 ? (

  <div className="empty-activity">

    <div className="activity-empty-icon">📋</div>

    <p>No recent activity yet.</p>

  </div>

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

      <div className="activity-left">

        <div className="activity-icon">

         {activity.includes("Deleted")
  ? "🗑️"
  : activity.includes("Updated")
  ? "✏️"
  : activity.includes("Completed")
  ? "✅"
  : activity.includes("Refilled")
  ? "🔄"
  : activity.includes("Added")
  ? "➕"
  : "📌"}

        </div>

        <span>{activity}</span>

      </div>

      <span className="activity-time">
        Today
      </span>

    </div>

  ))

)}

    </div>

</div>

</div>

      </div>

    );
}

export default Dashboard;