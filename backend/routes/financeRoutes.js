// routes/financeRoutes.js
const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// CREATE - Add a new application
router.post("/", async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - Get all applications for a user
router.get("/:userId", async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId });
    res.json(applications);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE - Update an application by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedApplication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Delete an application by ID
router.delete("/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
