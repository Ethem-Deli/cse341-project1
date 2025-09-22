const { validationResult } = require("express-validator");
const Task = require("../models/task");
// CRUD operations for Task
// Get all tasks
async function getAll(req, res) {
  //#swagger.tags=["Tasks"]
  try {
    const docs = await Task.find();
    res.json(docs);
  } catch (err) {
    console.error("getAll tasks error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
// Get a single task by ID
async function getSingle(req, res) {
  //#swagger.tags=["Tasks"]
  /*
  #swagger.tags = ["Tasks"]
  #swagger.description = "Get a single task by ID"
  #swagger.parameters["id"] = {
    in: "path",
    required: true,
    type: "string",
    description: "Task ID"
  }
  #swagger.responses[200] = { description: "Task found" }
  #swagger.responses[404] = { description: "Task not found" }
*/
  try {
    const doc = await Task.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Task not found" });
    res.json(doc);
  } catch (err) {
    console.error("getSingle task error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
// Create a new task
async function createTask(req, res) {
  //#swagger.tags=["Tasks"]
  /*
    #swagger.tags = ["Tasks"]
    #swagger.description = "Create a new task"
    #swagger.parameters["body"] = {
      in: "body",
      description: "Task data",
      required: true,
      schema: {
        $title: "Finish project",
        status: "pending"
      }
    }
    #swagger.responses[201] = { description: "Task created successfully" }
    #swagger.responses[400] = { description: "Validation error" }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("createTask error:", err);
    if (err.name === "ValidationError") return res.status(400).json({ error: err.message });
    res.status(500).json({ error: "Server error" });
  }
}
// Update an existing task by ID
async function updateTask(req, res) {
  //#swagger.tags=["Tasks"]
  /*
  #swagger.tags = ["Tasks"]
  #swagger.description = "Update an existing task"
  #swagger.parameters["id"] = {
    in: "path",
    required: true,
    type: "string",
    description: "Task ID"
  }
  #swagger.parameters["body"] = {
    in: "body",
    description: "Updated task data",
    schema: {
      title: "Finish project ASAP",
      status: "in-progress"
    }
  }
  #swagger.responses[200] = { description: "Task updated successfully" }
  #swagger.responses[400] = { description: "Validation error" }
  #swagger.responses[404] = { description: "Task not found" }
*/
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    console.error("updateTask error:", err);
    if (err.name === "ValidationError") return res.status(400).json({ error: err.message });
    res.status(500).json({ error: "Server error" });
  }
}
// Delete a task by ID
async function deleteTask(req, res) {
  //#swagger.tags=["Tasks"]
  /*
  #swagger.tags = ["Tasks"]
  #swagger.description = "Delete a task by ID"
  #swagger.parameters["id"] = {
    in: "path",
    required: true,
    type: "string",
    description: "Task ID"
  }
  #swagger.responses[200] = { description: "Task deleted successfully" }
  #swagger.responses[404] = { description: "Task not found" }
*/
  try {
    const removed = await Task.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("deleteTask error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getAll,
  getSingle,
  createTask,
  updateTask,
  deleteTask,
};
