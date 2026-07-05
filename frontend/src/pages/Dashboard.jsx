import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import healthTips from "../data/healthTips";
import HealthTips from "../components/HealthTips";
import appointmentsData from "../data/appointments";

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

const profile =
  JSON.parse(localStorage.getItem("profile")) || {};
const firstName =
  profile.fullName
    ? profile.fullName.split(" ")[0]
    : "User";

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

    {medicines.length === 0 ? (

      <p>No medicines added yet.</p>

    ) : (

      medicines.slice(0,4).map((medicine,index)=>(

       <div className="medicine-row" key={index}>

  <div className="medicine-info">

    <div className="medicine-icon">
      💊
    </div>

    <div>

      <h4>{medicine.name}</h4>

      <p>Scheduled Medicine</p>

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
      ...
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
            : activity.includes("Refilled")
            ? "🔄"
            : activity.includes("Took")
            ? "✅"
            : "➕"}

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