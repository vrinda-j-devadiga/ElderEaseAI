const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicineController");

router.post("/", protect, addMedicine);
router.get("/", protect, getMedicines);
router.put("/:id", protect, updateMedicine);
router.delete("/:id", protect, deleteMedicine);

module.exports = router;