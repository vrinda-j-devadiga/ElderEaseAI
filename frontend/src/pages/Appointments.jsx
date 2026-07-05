import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import appointmentsData from "../data/appointments";

function Appointments() {
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [doctorName, setDoctorName] = useState("");
  const [hospital, setHospital] = useState("");
  const [purpose, setPurpose] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");

    return savedAppointments
      ? JSON.parse(savedAppointments)
      : appointmentsData;
  });

  useEffect(() => {
    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

   useEffect(() => {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();

    appointments.forEach((appointment) => {
      const appointmentTime = new Date(
        `${appointment.date}T${appointment.time}`
      );

      const diffMinutes =
        (appointmentTime - now) / (1000 * 60);

      if (
  diffMinutes > 0 &&
  diffMinutes <= 30 &&
  !appointment.reminderSent
) {
        new Notification("📅 ElderEase AI", {
          body: `Appointment with Dr. ${appointment.doctorName} in ${Math.ceil(diffMinutes)} minutes.`,
        })
        appointment.reminderSent = true;
        setAppointments([...appointments]);;
      }
    });
  }, 60000);

  return () => clearInterval(interval);
}, [appointments]);

  const addAppointment = () => {
    if (
      !doctorName ||
      !hospital ||
      !appointmentTitle ||
      !appointmentDate ||
      !appointmentTime ||
      !purpose
    ) {
      alert("Please fill all fields");
      return;
    }

    const newAppointment = {
  doctorName,
  hospital,
  title: appointmentTitle,
  purpose,
  date: appointmentDate,
  time: appointmentTime,
  completed: false,
  reminderSent: false,
};

    if (editIndex !== null) {
      const updatedAppointments = [...appointments];
      updatedAppointments[editIndex] = newAppointment;

      setAppointments(updatedAppointments);

updateActivity(
  `✅ Completed appointment with ${updatedAppointments[index].doctorName}`
);

updateActivity(
  `➕ Added appointment with ${doctorName}`
);

updateActivity(
  `✏ Updated appointment with ${doctorName}`
);

      setEditIndex(null);
    } else {
      setAppointments([
        ...appointments,
        newAppointment,
      ]);
    }

    setDoctorName("");
    setHospital("");
    setAppointmentTitle("");
    setPurpose("");
    setAppointmentDate("");
    setAppointmentTime("");
  };

  const editAppointment = (index) => {
    const appointment = appointments[index];

    setDoctorName(appointment.doctorName);
    setHospital(appointment.hospital);
    setAppointmentTitle(appointment.title);
    setPurpose(appointment.purpose);
    setAppointmentDate(appointment.date);
    setAppointmentTime(appointment.time);

    setEditIndex(index);
  };

  const deleteAppointment = (index) => {
    const updatedAppointments =
      appointments.filter((_, i) => i !== index);
      updateActivity(
  `🗑 Deleted appointment with ${appointments[index].doctorName}`
);

    setAppointments(updatedAppointments);

    if (editIndex === index) {
      setEditIndex(null);
      setDoctorName("");
      setHospital("");
      setAppointmentTitle("");
      setPurpose("");
      setAppointmentDate("");
      setAppointmentTime("");
    }
  };

  const completeAppointment = (index) => {
  const updatedAppointments = [...appointments];

  updatedAppointments[index].completed = true;

  setAppointments(updatedAppointments);
};

const updateActivity = (message) => {
  const savedActivities =
    JSON.parse(localStorage.getItem("activities")) || [];

  const updatedActivities = [
    message,
    ...savedActivities,
  ].slice(0, 5);

  localStorage.setItem(
    "activities",
    JSON.stringify(updatedActivities)
  );
};

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">

        <h1>📅 Appointments</h1>

        <div className="section-card">

          <h2>➕ Add Appointment</h2>

  <div className="add-appointment">

  <input
    type="text"
    placeholder="Doctor Name"
    value={doctorName}
    onChange={(e) => setDoctorName(e.target.value)}
  />

  <input
    type="text"
    placeholder="Hospital / Clinic"
    value={hospital}
    onChange={(e) => setHospital(e.target.value)}
  />

  <input
    type="text"
    placeholder="Appointment Title"
    value={appointmentTitle}
    onChange={(e) => setAppointmentTitle(e.target.value)}
  />

  <input
    type="date"
    value={appointmentDate}
    onChange={(e) => setAppointmentDate(e.target.value)}
  />

  <input
    type="time"
    value={appointmentTime}
    onChange={(e) => setAppointmentTime(e.target.value)}
  />

  <input
    type="text"
    placeholder="Purpose"
    value={purpose}
    onChange={(e) => setPurpose(e.target.value)}
  />

</div>

<div className="add-btn-container">
  <button
    className="add-btn"
    onClick={addAppointment}
  >
    {editIndex !== null
      ? "Update Appointment"
      : "Add Appointment"}
  </button>
</div>

        </div>

        <div className="section-card">
 <input
  className="search-input"
  type="text"
  placeholder="🔍 Search Doctor..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

          <h2>📅 Upcoming Appointments</h2>

          {appointments.length === 0 ? (
            <p>No appointments scheduled.</p>
          ) : (
           appointments
.filter((appointment) =>
  `${appointment.doctorName || ""} ${appointment.title || ""}`
    .toLowerCase()
    .includes(search.toLowerCase())
)
  .map((appointment, index) => ( 
              <div
                key={index}
                className="appointment-card"
              >

                <h3>👨‍⚕️ {appointment.doctorName}</h3>

                <p>🏥 {appointment.hospital}</p>

                <p>📝 {appointment.title}</p>

                <p>📌 {appointment.purpose}</p>

                <p>📅 {appointment.date}</p>

                <p>🕒 {appointment.time}</p>

                <div className="appointment-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      editAppointment(index)
                    }
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteAppointment(index)
                    }
                  >
                    🗑 Delete
                  </button>

                  {!appointment.completed ? (
  <button
    className="complete-btn"
    onClick={() => completeAppointment(index)}
  >
    ✔ Complete
  </button>
) : (
  <span className="completed-badge">
    ✅ Completed
  </span>
)}

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default Appointments;