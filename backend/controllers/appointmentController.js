const Appointment = require("../models/Appointment");

// Add Appointment
const addAppointment = async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  try {
    const { doctorName, hospital, department, date, time, notes } = req.body;

    const appointment = await Appointment.create({
      user: req.user.id,
      doctorName,
      hospital,
      department,
      date,
      time,
      notes,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    console.log("Logged in user:", req.user.id);

    const appointments = await Appointment.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    console.log("Appointments found:", appointments);

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await appointment.deleteOne();

    res.json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};