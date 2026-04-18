const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Get all jobs (user specific)
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a job
router.post('/', auth, async (req, res) => {
  const job = new Job({
    user: req.user.id,
    company: req.body.company,
    position: req.body.position,
    status: req.body.status,
    location: req.body.location,
    notes: req.body.notes,
    appliedDate: req.body.appliedDate,
    interviewDate: req.body.interviewDate,
    priority: req.body.priority
  });
  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a job
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a job
router.delete('/:id', auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;