const Medicine = require("../models/Medicine");

// Add Medicine
const addMedicine = async (req, res) => {
  try {
    const {
      name,
      dosage,
      frequency,
      time,
      startDate,
      endDate,
      quantity,
      timesPerDay,
    } = req.body;

    const medicine = await Medicine.create({
      user: req.user._id,
      name,
      dosage,
      frequency,
      time,
      startDate,
      endDate,
      quantity,
      timesPerDay,
    });

    res.status(201).json({
      message: "Medicine Added Successfully",
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Medicine Reminders
const getMedicineReminders = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      user: req.user._id,
    });

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const reminders = medicines.map((medicine) => {
      const [hours, minutes] = medicine.time.split(":").map(Number);

      const medicineTime = new Date();
      medicineTime.setHours(hours, minutes, 0, 0);

      let reminderStatus = "Upcoming";

      if (medicine.lastTakenDate === today) {
        reminderStatus = "Taken";
      } else if (medicineTime <= now) {
        reminderStatus = "Due";
      }

      return {
        _id: medicine._id,
        name: medicine.name,
        dosage: medicine.dosage,
        time: medicine.time,
        quantity: medicine.quantity,
        status: reminderStatus,
      };
    });

    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Medicine
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    medicine.name = req.body.name ?? medicine.name;
    medicine.dosage = req.body.dosage ?? medicine.dosage;
    medicine.frequency = req.body.frequency ?? medicine.frequency;
    medicine.time = req.body.time ?? medicine.time;
    medicine.startDate = req.body.startDate ?? medicine.startDate;
    medicine.endDate = req.body.endDate ?? medicine.endDate;
    medicine.quantity = req.body.quantity ?? medicine.quantity;
    medicine.timesPerDay = req.body.timesPerDay ?? medicine.timesPerDay;
    medicine.status = req.body.status ?? medicine.status;

    medicine.takenCount =
      req.body.takenCount ?? medicine.takenCount;

    medicine.lastTakenDate =
      req.body.lastTakenDate ?? medicine.lastTakenDate;

    medicine.lowStockNotified =
      req.body.lowStockNotified ?? medicine.lowStockNotified;

    const updatedMedicine = await medicine.save();

    res.status(200).json({
      message: "Medicine Updated Successfully",
      medicine: updatedMedicine,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Medicine
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    await medicine.deleteOne();

    res.status(200).json({
      message: "Medicine Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addMedicine,
  getMedicines,
  getMedicineReminders,
  updateMedicine,
  deleteMedicine,
};