const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/attendanceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  date: { type: Date, default: Date.now }
});

const Student = mongoose.model("Student", studentSchema);

// Routes
app.post("/api/attendance", async (req, res) => {
  try {
    const { name, studentId } = req.body;
    const student = new Student({ name, studentId });
    await student.save();
    res.json({ message: "Attendance saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/attendance", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
