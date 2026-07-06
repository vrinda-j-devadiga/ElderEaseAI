const express = require("express");

const router = express.Router();

const {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

// GET all appointments
router.get("/", protect, getAppointments);

// POST new appointment
router.post("/", protect, addAppointment);

// PUT update appointment
router.put("/:id", protect, updateAppointment);

// DELETE appointment
router.delete("/:id", protect, deleteAppointment);

module.exports = router;