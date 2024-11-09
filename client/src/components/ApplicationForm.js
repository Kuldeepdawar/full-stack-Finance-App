// src/components/ApplicationForm.js
import React, { useState } from "react";
import axios from "axios";

function ApplicationForm({ onSave }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    income: "",
    expenses: "",
    assets: "",
    liabilities: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/finance", form);
      onSave(res.data);
    } catch (error) {
      console.error("Error saving application:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />
      <input
        type="number"
        name="income"
        placeholder="Income"
        onChange={handleChange}
      />
      <input
        type="number"
        name="expenses"
        placeholder="Expenses"
        onChange={handleChange}
      />
      <input
        type="number"
        name="assets"
        placeholder="Assets"
        onChange={handleChange}
      />
      <input
        type="number"
        name="liabilities"
        placeholder="Liabilities"
        onChange={handleChange}
      />
      <button type="submit">Save Application</button>
    </form>
  );
}

export default ApplicationForm;
