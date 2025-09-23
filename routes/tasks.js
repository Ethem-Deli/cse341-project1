const express = require("express");
const validate = require("../middleware/validate");
const { taskCreate, taskUpdate } = require("../validation/taskValidation");
const validateObjectId = require("../middleware/validateObjectId");
const controller = require("../controllers/tasks");

// Create a router instance
const router = express.Router();

// Get all tasks
router.get("/", controller.getAll);

// Get a single task by ID
router.get("/:id", validateObjectId, controller.getSingle);

// Create a new task
/**
 * @route POST /tasks
 * @security bearerAuth
 */
router.post("/", validate(taskCreate), controller.createTask);

// Update an existing task by ID
/**
 * @route PUT /tasks/{id}
 * @security bearerAuth
 */
router.put("/:id", validateObjectId, validate(taskUpdate), controller.updateTask);

// Delete a task by ID
/**
 * @route DELETE /tasks/{id}
 * @security bearerAuth
 */
router.delete("/:id", validateObjectId, controller.deleteTask);

module.exports = router;


//**END**