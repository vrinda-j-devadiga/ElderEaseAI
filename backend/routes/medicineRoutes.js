const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
  getMedicineReminders,
} = require("../controllers/medicineController");

router.post("/", protect, addMedicine);

// Reminder Route
router.get("/reminders", protect, getMedicineReminders);

router.get("/", protect, getMedicines);
router.put("/:id", protect, updateMedicine);
router.delete("/:id", protect, deleteMedicine);

module.exports = router;