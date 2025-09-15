import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 

function App() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [students, setStudents] = useState([]);

 
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !studentId) return;
    await axios.post("http://localhost:5000/api/attendance", { name, studentId });
    setName("");
    setStudentId("");
    fetchStudents(); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📋 Attendance Management by Yash Raj</h1>
        <p>Mark and view student attendance easily</p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <button type="submit">✅ Mark Attendance</button>
      </form>

      {/* Attendance Table */}
      <h2>Attendance Records </h2>
      {students.length === 0 ? (
        <p>No records yet...</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>{s.studentId}</td>
                <td>{new Date(s.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
