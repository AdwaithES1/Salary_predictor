import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    gender: "male",
    qualification: "Bachelors",
    title: "Software Engineer",
    experience: ""
  });
  const [salary, setSalary] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setSalary(data.predicted_salary);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Salary Predictor</h1>
      <form onSubmit={handleSubmit}>
        <label>Gender:</label>
        <select name="gender" onChange={handleChange}>
          <option>male</option>
          <option>female</option>
        </select><br /><br />

        <label>Qualification:</label>
        <select name="qualification" onChange={handleChange}>
          <option>Bachelors</option>
          <option>Masters</option>
          <option>PhD</option>
        </select><br /><br />

        <label>Job Title:</label>
        <select name="title" onChange={handleChange}>
          <option>Software Engineer</option>
          <option>Data Analyst</option>
          <option>Manager</option>
        </select><br /><br />

        <label>Experience (years):</label>
        <input
          type="number"
          name="experience"
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Predict Salary</button>
      </form>

      {salary && <h2>Predicted Salary: ₹{salary}</h2>}
    </div>
  );
}

export default App;
