const { validationResult } = require('express-validator');
const Task = require('../models/task');
// CRUD operations for Task
// Get all tasks
async function getAll(req, res) {
  //#swagger.tags=["Contacts"]
  try {
    const docs = await Task.find();
    res.json(docs);
  } catch (err) {
    console.error('getAll tasks error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
// Get a single task by ID
async function getSingle(req, res) {
  //#swagger.tags=["Contacts"]
  try {
    const doc = await Task.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Task not found' });
    res.json(doc);
  } catch (err) {
    console.error('getSingle task error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
// Create a new task
async function createTask(req, res) {
  //#swagger.tags=["Contacts"]
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('createTask error:', err);
    if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
    res.status(500).json({ error: 'Server error' });
  }
}
// Update an existing task by ID
async function updateTask(req, res) {
  //#swagger.tags=["Contacts"]
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    console.error('updateTask error:', err);
    if (err.name === 'ValidationError') return res.status(400).json({ error: err.message });
    res.status(500).json({ error: 'Server error' });
  }
}
// Delete a task by ID
async function deleteTask(req, res) {
  //#swagger.tags=["Contacts"]
  try {
    const removed = await Task.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('deleteTask error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getAll,
  getSingle,
  createTask,
  updateTask,
  deleteTask,
};
