import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState, useEffect } from "react";
import API from "../api/axios";

function Reports() {

  const [medicines, setMedicines] = useState([]);
const [appointments, setAppointments] = useState([]);
const [profile, setProfile] = useState({});

useEffect(() => {
  const fetchReports = async () => {
    try {
      const [medicineRes, appointmentRes, profileRes] =
  await Promise.all([
    API.get("/medicines"),
    API.get("/appointments"),
    API.get("/users/profile"),
  ]);

setMedicines(medicineRes.data);
setAppointments(appointmentRes.data);
setProfile(profileRes.data);

    } catch (error) {
      console.error(
        "Failed to fetch reports:",
        error
      );
    }
  };

  fetchReports();
}, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("ElderEase AI Report", 14, 20);
    doc.setFontSize(10);

doc.text(
  `Generated on: ${new Date().toLocaleDateString()}`,
  14,
  27
);

    doc.setFontSize(14);
    doc.text("Profile", 14, 35);

    autoTable(doc, {
      startY: 40,
      head: [["Field", "Value"]],
     body: [
  ["Name", profile.name || "-"],
  ["Email", profile.email || "-"],
  ["Age", profile.age || "-"],
  ["Blood Group", profile.bloodGroup || "-"],
  ["Weight", profile.weight || "-"],
],
    });

    doc.text(
      "Medicines",
      14,
      doc.lastAutoTable.finalY + 15
    );

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Medicine", "Quantity", "Status"]],

body: medicines.map((medicine) => [
  medicine.name,
  medicine.quantity,
  medicine.status,
]),
    });

    doc.text(
      "Appointments",
      14,
      doc.lastAutoTable.finalY + 15
    );

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Doctor", "Hospital", "Date", "Time", "Status"]],
      body: appointments.map((appointment) => [
  appointment.doctorName,
  appointment.hospital,
  appointment.date,
  appointment.time,
  appointment.status,
]),
    });

    doc.save("ElderEase_Report.pdf");
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">

        <h1>📄 Reports</h1>

        <div className="section-card">

          <h2>👤 Profile Summary</h2>

       <p>
  👤 <strong>Name:</strong> {profile.name || "Not Added"}
</p>

<p>
  📧 <strong>Email:</strong> {profile.email || "-"}
</p>

<p>
  🎂 <strong>Age:</strong> {profile.age || "-"} Years
</p>

<p>
  🩸 <strong>Blood Group:</strong> {profile.bloodGroup || "-"}
</p>

<p>
  ⚖️ <strong>Weight:</strong> {profile.weight || "-"} kg
</p>
</div>

        <div className="section-card">

          <h2>💊 Medicines ({medicines.length})</h2>

          {medicines.map((medicine) => (
  <div key={medicine._id} className="report-medicine">

    <p>
      💊 <strong>{medicine.name}</strong> — {medicine.quantity} tablets left
    </p>

    <p>
      Status:{" "}
      {medicine.status === "Completed"
        ? "✅ Completed"
        : "⏳ Pending"}
    </p>

  </div>
))}

        </div>

        <div className="section-card">

          <h2>📅 Appointments ({appointments.length})</h2>

          {appointments.map((appointment) => (
  <div key={appointment._id} className="report-appointment">
    <p>
      📅 <strong>{appointment.doctorName}</strong>
    </p>

    <p>🏥 {appointment.hospital}</p>

    <p>
      🗓 {appointment.date}
    </p>

    <p>🕒 {appointment.time}</p>

    <p>
  Status: {appointment.status}
</p>



  </div>
))}

        </div>

        <button
          className="ai-btn"
          onClick={downloadPDF}
        >
          ⬇ Download PDF Report
        </button>

      </div>
    </div>
  );
}

export default Reports;