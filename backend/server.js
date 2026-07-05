const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { protect } = require("./middleware/authMiddleware");
const medicineRoutes = require("./routes/medicineRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 ElderEase AI Backend Running...");
});

app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});