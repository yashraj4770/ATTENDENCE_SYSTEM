import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [students, setStudents] = useState([]);

  // Fetch students
  useEffect(() => {
    axios.get("https://attendence-system-y0wf.onrender.com/api/attendance")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, [students]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://attendence-system-y0wf.onrender.com/api/attendance", { name, studentId });
    setName("");
    setStudentId("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Attendance Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <button type="submit">Mark Attendance</button>
      </form>

      <h2>Attendance List</h2>
      <ul>
        {students.map((s, index) => (
          <li key={index}>
            {s.name} ({s.studentId}) - {new Date(s.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
