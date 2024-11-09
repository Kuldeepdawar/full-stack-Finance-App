// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([]);
  const [editingApplication, setEditingApplication] = useState(null);

  useEffect(() => {
    axios
      .get("/api/finance/:userId") // Replace with actual userId
      .then((response) => setApplications(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addApplication = (data) => {
    axios
      .post("/api/finance", data)
      .then((response) => setApplications([...applications, response.data]))
      .catch((error) => console.error("Error adding data:", error));
  };

  const updateApplication = (data) => {
    axios
      .put(`/api/finance/${data.id}`, data)
      .then((response) => {
        setApplications(
          applications.map((app) => (app.id === data.id ? response.data : app))
        );
        setEditingApplication(null);
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const deleteApplication = (id) => {
    axios
      .delete(`/api/finance/${id}`)
      .then(() => setApplications(applications.filter((app) => app.id !== id)))
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div className="App">
      <Header />
      <ApplicationForm
        addApplication={addApplication}
        updateApplication={updateApplication}
        editingApplication={editingApplication}
        setEditingApplication={setEditingApplication}
      />
      <ApplicationList
        applications={applications}
        deleteApplication={deleteApplication}
        setEditingApplication={setEditingApplication}
      />
    </div>
  );
}

export default App;
