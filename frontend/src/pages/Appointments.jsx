import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

function Appointments() {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [hospital, setHospital] = useState("");
  const [department, setDepartment] = useState("");
const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);

useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");

      setAppointments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchAppointments();
}, []);

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
       setAppointments((prev) =>
  prev.map((item) =>
    item._id === appointment._id
      ? { ...item, reminderSent: true }
      : item
  )
);
      }
    });
  }, 60000);

  return () => clearInterval(interval);
}, [appointments]);

const addAppointment = async () => {
  if (
    !doctorName ||
    !hospital ||
    !department ||
    !appointmentDate ||
    !appointmentTime
  ) {
    alert("Please fill all required fields");
    return;
  }

  try {
   if (editingId) {
  const res = await API.put(`/appointments/${editingId}`, {
    doctorName,
    hospital,
    department,
    date: appointmentDate,
    time: appointmentTime,
    notes,
  });

  setAppointments((prev) =>
    prev.map((appointment) =>
      appointment._id === editingId ? res.data : appointment
    )
  );

  updateActivity(
    `✏️ Updated appointment with ${doctorName}`
  );

  setEditingId(null);
} else {
  const res = await API.post("/appointments", {
    doctorName,
    hospital,
    department,
    date: appointmentDate,
    time: appointmentTime,
    notes,
  });

  setAppointments((prev) => [res.data, ...prev]);

  updateActivity(
    `➕ Added appointment with ${doctorName}`
  );
}

    // Clear form
    setDoctorName("");
    setHospital("");
    setDepartment("");
    setNotes("");
    setAppointmentDate("");
    setAppointmentTime("");
    setEditingId(null);

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to add appointment."
    );
  }
};

 const editAppointment = (appointment) => {

  setDoctorName(appointment.doctorName);
  setHospital(appointment.hospital);
  setDepartment(appointment.department);
  setNotes(appointment.notes || "");
  setAppointmentDate(appointment.date);
  setAppointmentTime(appointment.time);

  setEditingId(appointment._id);
};

const deleteAppointment = async (id, doctorName) => {
  try {
    await API.delete(`/appointments/${id}`);

    setAppointments((prev) =>
      prev.filter((appointment) => appointment._id !== id)
    );

    updateActivity(`🗑 Deleted appointment with ${doctorName}`);
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to delete appointment."
    );
  }
};

const completeAppointment = async (appointment) => {
  try {
    const res = await API.put(`/appointments/${appointment._id}`, {
      status: "Completed",
    });

    setAppointments((prev) =>
      prev.map((item) =>
        item._id === appointment._id ? res.data : item
      )
    );

    updateActivity(
      `✅ Completed appointment with ${appointment.doctorName}`
    );
  } catch (error) {
    console.error(error);
    alert("Failed to complete appointment.");
  }
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
   placeholder="Department"
value={department}
onChange={(e) => setDepartment(e.target.value)}
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
  placeholder="Notes"
   value={notes}
onChange={(e) => setNotes(e.target.value)}
  />

</div>

<div className="add-btn-container">
  <button
    className="add-btn"
    onClick={addAppointment}
  >
    {editingId
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
 `${appointment.doctorName || ""} ${appointment.department || ""}`
    .toLowerCase()
    .includes(search.toLowerCase())
)
  .map((appointment, index) => ( 
              <div
                key={appointment._id}
                className="appointment-card"
              >

                <h3>👨‍⚕️ {appointment.doctorName}</h3>

                <p>🏥 {appointment.hospital}</p>

               <p>📝 {appointment.department}</p>

               <p>📌 {appointment.notes}</p>

                <p>📅 {appointment.date}</p>

                <p>🕒 {appointment.time}</p>

                <div className="appointment-actions">

                  <button
                    className="edit-btn"
                    onClick={() => editAppointment(appointment)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
  deleteAppointment(
    appointment._id,
    appointment.doctorName
  )
}
                  >
                    🗑 Delete
                  </button>

                  {appointment.status !== "Completed" ? (
  <button
    className="complete-btn"
   onClick={() => completeAppointment(appointment)}
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