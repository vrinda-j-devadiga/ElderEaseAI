import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
  const profile =
    JSON.parse(localStorage.getItem("profile")) || {};

  const medicines =
    JSON.parse(localStorage.getItem("medicines")) || [];

  const appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("ElderEase AI Report", 14, 20);

    doc.setFontSize(14);
    doc.text("Profile", 14, 35);

    autoTable(doc, {
      startY: 40,
      head: [["Field", "Value"]],
      body: [
        ["Name", profile.fullName || "-"],
        ["Age", profile.age || "-"],
        ["Gender", profile.gender || "-"],
        ["Blood Group", profile.bloodGroup || "-"],
        ["Height", profile.height || "-"],
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
      head: [["Medicine", "Quantity"]],
      body: medicines.map((medicine) => [
        medicine.name,
        medicine.quantity,
      ]),
    });

    doc.text(
      "Appointments",
      14,
      doc.lastAutoTable.finalY + 15
    );

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Doctor", "Hospital", "Date", "Time"]],
      body: appointments.map((appointment) => [
        appointment.doctorName,
        appointment.hospital,
        appointment.date,
        appointment.time,
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

          <p>👤 <strong>Name:</strong> {profile.fullName || "Not Added"}</p>

<p>🎂 <strong>Age:</strong> {profile.age || "-"} Years</p>

<p>🩸 <strong>Blood Group:</strong> {profile.bloodGroup || "-"}</p>

<p>⚖️ <strong>Weight:</strong> {profile.weight || "-"} kg</p>
        </div>

        <div className="section-card">

          <h2>💊 Medicines ({medicines.length})</h2>

          {medicines.map((medicine, index) => (
  <p key={index}>
    💊 <strong>{medicine.name}</strong> — {medicine.quantity} tablets left
  </p>
))}

        </div>

        <div className="section-card">

          <h2>📅 Appointments ({appointments.length})</h2>

          {appointments.map((appointment, index) => (
  <div key={index} className="report-appointment">
    <p>
      📅 <strong>{appointment.doctorName}</strong>
    </p>

    <p>
      🗓 {appointment.date}
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