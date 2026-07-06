import { useState, useEffect } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import MedicineList from "../components/MedicineList";

function Medicines() {

  const [medicineName, setMedicineName] = useState("");
  const [medicineTime, setMedicineTime] = useState("");
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [quantity, setQuantity] = useState("");
const [timesPerDay, setTimesPerDay] = useState(1);
const [editIndex, setEditIndex] = useState(null);
const [medicines, setMedicines] = useState([]);

useEffect(() => {
  fetchMedicines();
}, []);

const fetchMedicines = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/medicines", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMedicines(res.data);
  }  catch (error) {
  console.error("GET MEDICINES ERROR:");
  console.error(error);
}
};

const deleteMedicine = async (index) => {
  try {

    const token = localStorage.getItem("token");

    await API.delete(
      `/medicines/${medicines[index]._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchMedicines();

    updateActivity(
      `🗑 Deleted ${medicines[index].name}`
    );

  } catch (error) {
    console.log(error);
  }
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


const markAsTaken = async (index) => {

  const updatedMedicines = [...medicines];

  const today = new Date().toISOString().split("T")[0];


  if (updatedMedicines[index].lastTakenDate !== today) {
    updatedMedicines[index].takenCount = 0;
    updatedMedicines[index].lastTakenDate = today;
  }


  if (
    updatedMedicines[index].takenCount >=
    updatedMedicines[index].timesPerDay
  ) {
    return;
  }

  
  updatedMedicines[index].takenCount++;
  if (
  updatedMedicines[index].takenCount >=
  updatedMedicines[index].timesPerDay
) {
  updatedMedicines[index].status = "Completed";
}

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

 try {
  await API.put(
    `/medicines/${updatedMedicines[index]._id}`,
    updatedMedicines[index]
  );

  fetchMedicines();

  updateActivity(
    `✔ Took ${updatedMedicines[index].name} (${updatedMedicines[index].takenCount}/${updatedMedicines[index].timesPerDay})`
  );

} catch (error) {
  console.error(error);
  alert("Failed to update medicine.");
}
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

const addMedicine = async () => {
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

  try {
    const token = localStorage.getItem("token");

    const medicineData = {
      name: medicineName,
      dosage: "",
      frequency: `${timesPerDay} Times / Day`,
      time: medicineTime,
      startDate,
      endDate,
      quantity: Number(quantity),
      timesPerDay,
    };

    if (editIndex !== null) {

      await API.put(
        `/medicines/${medicines[editIndex]._id}`,
        medicineData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateActivity(`✏ Updated ${medicineName}`);

      setEditIndex(null);

    } else {

      await API.post(
        "/medicines",
        medicineData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateActivity(`➕ Added ${medicineName}`);
    }

    fetchMedicines();

    setMedicineName("");
    setMedicineTime("");
    setStartDate("");
    setEndDate("");
    setQuantity("");
    setTimesPerDay(1);

  } catch (error) {
    console.log(error);
    alert("Failed to save medicine");
  }
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