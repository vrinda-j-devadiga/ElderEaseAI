function Appointments({ appointments }) {
  return (
    <div className="section-card">

      <h2>📅 Upcoming Appointments</h2>

      <div className="appointments-list">

        {appointments.map((appointment, index) => (

          <div
            key={index}
            className="appointment-item"
          >
            <span>🩺</span>

            <div>
              <p>
                {appointment.title} - {appointment.date}, {appointment.time}
              </p>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Appointments;