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
    };

    if (editIndex !== null) {
      const updatedAppointments = [...appointments];
      updatedAppointments[editIndex] = newAppointment;

      setAppointments(updatedAppointments);
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

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">

        <h1>📅 Appointments</h1>

        <div className="section-card">

          <h2>➕ Add Appointment</h2>

          <div className="add-medicine">

            <input
              type="text"
              placeholder="Doctor Name"
              value={doctorName}
              onChange={(e) =>
                setDoctorName(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Hospital / Clinic"
              value={hospital}
              onChange={(e) =>
                setHospital(e.target.value)
              }
            />

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

            <input
              type="text"
              placeholder="Purpose"
              value={purpose}
              onChange={(e) =>
                setPurpose(e.target.value)
              }
            />

            <button onClick={addAppointment}>
              {editIndex !== null
                ? "Update Appointment"
                : "Add Appointment"}
            </button>

          </div>

        </div>

        <div className="section-card">

          <h2>📅 Upcoming Appointments</h2>

          {appointments.length === 0 ? (
            <p>No appointments scheduled.</p>
          ) : (
            appointments.map((appointment, index) => (
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