import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import medicinesData from "../data/medicines";
import MedicineList from "../components/MedicineList";


function Medicines() {

  const [medicineName, setMedicineName] = useState("");
  const [medicineTime, setMedicineTime] = useState("");
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [quantity, setQuantity] = useState("");
const [timesPerDay, setTimesPerDay] = useState(1);
const [editIndex, setEditIndex] = useState(null);

  const [medicines, setMedicines] = useState(() => {
    const savedMedicines =
      localStorage.getItem("medicines");

    return savedMedicines
      ? JSON.parse(savedMedicines)
      : medicinesData;
  });

  const deleteMedicine = (index) => {

  const updatedMedicines =
    medicines.filter((_, i) => i !== index);

  setMedicines(updatedMedicines);

  updateActivity(
    `🗑 Deleted ${medicines[index].name}`
  );

};

const editMedicine = (index) => {
  const medicine = medicines[index];

  setMedicineName(medicine.name);
  setMedicineTime(medicine.time);
  setStartDate(medicine.startDate);
  setEndDate(medicine.endDate);
  setQuantity(medicine.quantity);
  setTimesPerDay(medicine.timesPerDay || 1);

  setEditIndex(index);
};


const markAsTaken = (index) => {

  const updatedMedicines = [...medicines];

  const today = new Date().toISOString().split("T")[0];

  // Reset count if it's a new day
  if (updatedMedicines[index].lastTakenDate !== today) {
    updatedMedicines[index].takenCount = 0;
    updatedMedicines[index].lastTakenDate = today;
  }

  // Stop if today's limit is reached
  if (
    updatedMedicines[index].takenCount >=
    updatedMedicines[index].timesPerDay
  ) {
    return;
  }

  // Count this dose
  updatedMedicines[index].takenCount++;

  // Reduce stock
  if (updatedMedicines[index].quantity > 0) {
    updatedMedicines[index].quantity--;
  }

  // Low stock notification
  if (
    updatedMedicines[index].quantity <= 5 &&
    updatedMedicines[index].quantity > 0 &&
    !updatedMedicines[index].lowStockNotified
  ) {
    new Notification("💊 ElderEase AI", {
      body: `${updatedMedicines[index].name} is running low.\nOnly ${updatedMedicines[index].quantity} tablets left.`
    });

    updatedMedicines[index].lowStockNotified = true;
  }

  // Out of stock notification
  if (updatedMedicines[index].quantity === 0) {
    new Notification("💊 ElderEase AI", {
      body: `${updatedMedicines[index].name} is out of stock.\nPlease refill it.`
    });

    updateActivity(
      `🚨 ${updatedMedicines[index].name} is out of stock`
    );
  }

  setMedicines(updatedMedicines);

  updateActivity(
    `✔ Took ${updatedMedicines[index].name} (${updatedMedicines[index].takenCount}/${updatedMedicines[index].timesPerDay})`
  );
};

const refillMedicine = (index) => {
  const updatedMedicines = [...medicines];

  updatedMedicines[index].quantity = 30;
  updatedMedicines[index].lowStockNotified = false;

  setMedicines(updatedMedicines);

  updateActivity(
    `🔄 Refilled ${updatedMedicines[index].name}`
  );
};

const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "medicines",
      JSON.stringify(medicines)
    );
  }, [medicines]);

useEffect(() => {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();

    medicines.forEach((medicine) => {
      const [hours, minutes] =
        medicine.time.split(":");

      if (
        now.getHours() === parseInt(hours) &&
        now.getMinutes() === parseInt(minutes)
      ) {
        new Notification(
          "💊 ElderEase AI",
          {
            body: `Time to take ${medicine.name}`
          }
        );
      }
    });
  }, 60000);

 

  return () => clearInterval(interval);
}, [medicines]);

const addMedicine = () => {

  if (
    !medicineName ||
    !medicineTime ||
    !startDate ||
    !endDate ||
    !quantity
  ) {
    alert("Please fill all fields");
    return;
  }

 const medicineData = {
  name: medicineName,
  time: medicineTime,
  timesPerDay,
  takenCount: 0,
  lastTakenDate: "",
  quantity: Number(quantity),
  startDate,
  endDate,
  lowStockNotified: false
};

  if (editIndex !== null) {

    const updatedMedicines = [...medicines];
    updatedMedicines[editIndex] = medicineData;

    setMedicines(updatedMedicines);

    updateActivity(`✏ Updated ${medicineName}`);

    setEditIndex(null);

  } else {

    setMedicines([
      ...medicines,
      medicineData
    ]);

    updateActivity(`➕ Added ${medicineName}`);
  }

  setMedicineName("");
  setMedicineTime("");
  setStartDate("");
  setEndDate("");
  setQuantity("");
  setTimesPerDay(1);
};
  const getNextReminder = () => {
  const now = new Date();

  const upcoming = medicines.filter((medicine) => {
    const [hours, minutes] =
      medicine.time.split(":");

    const medicineTime = new Date();

    medicineTime.setHours(
      parseInt(hours),
      parseInt(minutes),
      0,
      0
    );

    return medicineTime > now;
  });

  if (upcoming.length === 0) {
    return null;
  }

  upcoming.sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  return upcoming[0];
};

const nextReminder = getNextReminder();

const formatTime = (time) => {
  const [hours, minutes] = time.split(":");

  const date = new Date();

  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
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

const getDueSoonMedicine = () => {
  const next = getNextReminder();

  if (!next) return null;

  const now = new Date();

  const [hours, minutes] =
    next.time.split(":");

  const medicineTime = new Date();

  medicineTime.setHours(
    parseInt(hours),
    parseInt(minutes),
    0,
    0
  );

  const diffMinutes =
    (medicineTime - now) / (1000 * 60);

  if (diffMinutes <= 30 && diffMinutes > 0) {
    return next;
  }

  return null;
};

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

  <div className="page-header">
    <h1>💊 Medicines</h1>
    <p>Manage your medicines and never miss a dose.</p>
  </div>

  <div className="reminder-card">

  <h2>⏰ Next Reminder</h2>

  {nextReminder ? (

    <div className="reminder-content">

      <div className="reminder-icon">
        💊
      </div>

      <h3>{nextReminder.name}</h3>

      <p className="reminder-time">
        🕒 Today • {formatTime(nextReminder.time)}
      </p>

      <span className="reminder-text">
        Next medicine due
      </span>

    </div>

  ) : (

    <div className="no-reminder">

      <div className="reminder-icon">
        💊
      </div>

      <h3>No Medicines Remaining</h3>

      <p>You're all caught up for today!</p>

    </div>

  )}

</div>

{getDueSoonMedicine() && (
  <div className="due-soon-alert">
    ⚠️ Medicine Due Soon:
    {` ${getDueSoonMedicine().name} at `}
    {formatTime(getDueSoonMedicine().time)}
  </div>
)}

        <div className="section-card">

          <h2>➕ Add Medicine</h2>

          <div className="add-medicine">

            <input
              type="text"
              placeholder="Medicine Name"
              value={medicineName}
              onChange={(e) =>
                setMedicineName(e.target.value)
              }
            />

            <input
              type="time"
              value={medicineTime}
              onChange={(e) =>
                setMedicineTime(e.target.value)
              }
            />

<div className="date-field">
  <label>Start Date</label>
  <input
    type="date"
    value={startDate}
    onChange={(e)=>setStartDate(e.target.value)}
  />
</div>

<div className="date-field">
  <label>End Date</label>
  <input
    type="date"
    value={endDate}
    onChange={(e)=>setEndDate(e.target.value)}
  />
</div>

<input
  type="number"
  placeholder="Quantity"
  value={quantity}
  onChange={(e) =>
    setQuantity(e.target.value)
  }
/>

  <select
    className="times-select"
    value={timesPerDay}
    onChange={(e)=>setTimesPerDay(Number(e.target.value))}
  >
    <option value={1}>1 Time / Day</option>
    <option value={2}>2 Times / Day</option>
    <option value={3}>3 Times / Day</option>
    <option value={4}>4 Times / Day</option>
  </select>

</div>

<div className="add-btn-container">
  <button
    className="add-btn"
    onClick={addMedicine}
  >
    {editIndex !== null ? "Update Medicine" : "Add Medicine"}
  </button>
          </div>

<input
  className="search-input"
  type="text"
  placeholder="🔍 Search medicine..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
         <MedicineList
  medicines={medicines.filter((medicine) =>
  medicine.name
    .toLowerCase()
    .includes(search.toLowerCase())
)}
  deleteMedicine={deleteMedicine}
  markAsTaken={markAsTaken}
  editMedicine={editMedicine}
  refillMedicine={refillMedicine}
/>

        </div>

      </div>


    </div>

    
  );
}

export default Medicines;