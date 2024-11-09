// src/components/ApplicationList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function ApplicationList() {
  const [applications, setApplications] = useState([]);

  // Fetch applications on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("/api/finance/:userId"); // Replace with actual user ID
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/finance/${id}`);
      setApplications(applications.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div>
      <h2>Saved Applications</h2>
      <ul>
        {applications.map((app) => (
          <li key={app._id}>
            <p>
              <strong>Name:</strong> {app.personalDetails.name}
            </p>
            <p>
              <strong>Age:</strong> {app.personalDetails.age}
            </p>
            <p>
              <strong>Income:</strong> {app.income}
            </p>
            <p>
              <strong>Expenses:</strong> {app.expenses}
            </p>
            <p>
              <strong>Assets:</strong> {app.assets}
            </p>
            <p>
              <strong>Liabilities:</strong> {app.liabilities}
            </p>
            <button onClick={() => handleDelete(app._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationList;
