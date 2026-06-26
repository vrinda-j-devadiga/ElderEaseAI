function MedicineList({
  medicines,
  deleteMedicine,
  markAsTaken,
  editMedicine,
  refillMedicine
}) {
  return (
    <div className="medicine-section">

      <h2>Today's Medicines</h2>

      {medicines.length === 0 ? (
        <p>No medicines scheduled today.</p>
      ) : (
        <div className="medicine-grid">

         {medicines.map((medicine, index) => {

         const today = new Date();
const start = new Date(medicine.startDate);
const end = new Date(medicine.endDate);

let durationText = "Course Completed";

if (end >= today) {
  const totalDays = Math.ceil(
    (end - today) / (1000 * 60 * 60 * 24)
  );

  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;

  if (months > 0 && days > 0) {
    durationText =
      `${months} Month${months > 1 ? "s" : ""} ${days} Day${days > 1 ? "s" : ""} Remaining`;
  } else if (months > 0) {
    durationText =
      `${months} Month${months > 1 ? "s" : ""} Remaining`;
  } else {
    durationText =
      `${days} Day${days > 1 ? "s" : ""} Remaining`;
  }
}

const totalDuration = end - start;
const completedDuration = today - start;

let progress = 0;

if (today <= start) {
  progress = 0;
} else if (today >= end) {
  progress = 100;
} else {
  progress = Math.round(
    (completedDuration / totalDuration) * 100
  );
}

  return (
              <div
  key={index}
  className={`medicine-card ${
    medicine.taken ? "taken-card" : ""
  }`}
>

                <div className="medicine-icon">
                  💊
                </div>

              <h3>{medicine.name}</h3>

<p className="medicine-time">
  🕒 {new Date(`2000-01-01T${medicine.time}`)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })}
</p>

 <p className="medicine-duration">
  📅 {durationText}
</p>

<p className="medicine-stock">
  💊 {medicine.quantity} Tablets Left
</p>
{medicine.quantity > 0 && medicine.quantity <= 5 && (
  <p className="low-stock">
    ⚠ Only {medicine.quantity} tablet
    {medicine.quantity > 1 ? "s" : ""} left. Buy soon!
  </p>
)}
{medicine.quantity === 0 && (
  <p className="out-stock">
    🚨 Out of Stock! Please refill this medicine.
  </p>
)}



<div className="progress-container">
  <div
    className="progress-fill"
    style={{ width: `${progress}%` }}
  ></div>
</div>

<p className="progress-text">
  {progress}% Treatment Completed
</p>

<button
  className="taken-btn"
  onClick={() => markAsTaken(index)}
  disabled={medicine.quantity === 0}
>
  ✔ Taken
</button>
{medicine.quantity === 0 && (
  <button
    className="refill-btn"
    onClick={() => refillMedicine(index)}
  >
    🔄 Refill
  </button>
)}


<button
  className="edit-btn"
  onClick={() => editMedicine(index)}
>
  Edit
</button>

<button
  className="delete-btn"
  onClick={() => deleteMedicine(index)}
>
  Delete
</button>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default MedicineList;