const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    dosage: String,

    frequency: String,

    time: {
      type: String,
      required: true,
    },

    startDate: String,

    endDate: String,

    quantity: {
      type: Number,
      default: 0,
    },

    timesPerDay: {
      type: Number,
      default: 1,
    },

    takenCount: {
      type: Number,
      default: 0,
    },

    lastTakenDate: {
      type: String,
      default: "",
    },

    lowStockNotified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);