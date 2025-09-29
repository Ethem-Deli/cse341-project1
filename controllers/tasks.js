const Task = require("../models/task");

exports.getAll = async (req, res, next) => {
  /* GET all tasks
   #swagger.tags = ["Tasks"]
*/
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.getSingle = async (req, res, next) => {
  /*Get Single Task by ID
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
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  /* CREATE task
  //#swagger.tags=["Tasks"]
  /*
  #swagger.tags = ["Tasks"]
  #swagger.description = "Create a new task"
  #swagger.parameters["body"] = {
    in: "body",
    description: "Task data",
    required: true,
    schema: {
      $title: "Write Swagger documentation",
      description: "Add all task endpoints to swagger.json for testing",
      status: "pending",
      priority: "high",
      dueDate: "2025-10-01T00:00:00.000Z"
    }
  }
  #swagger.responses[201] = { description: "Task created successfully" }
  #swagger.responses[400] = { description: "Validation error" }
*/
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};


exports.updateTask = async (req, res, next) => {
  /* UPDATE task
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
      title: "Write updated Swagger documentation",
      description: "Refine task details and test again",
      status: "in-progress",
      priority: "medium",
      dueDate: "2025-11-15T00:00:00.000Z"
    }
  }
  #swagger.responses[200] = { description: "Task updated successfully" }
  #swagger.responses[400] = { description: "Validation error" }
  #swagger.responses[404] = { description: "Task not found" }
*/
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  /* DELETE task  
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
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};
