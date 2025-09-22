const express = require("express");
const { body } = require("express-validator");
const validateObjectId = require("../middleware/validateObjectId");
const controller = require("../controllers/tasks");

// Create a router instance
const router = express.Router();
// Define routes for task operations
router.get("/", controller.getAll);
// Get a single task by ID
router.get("/:id", validateObjectId, controller.getSingle);
// Create a new task
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("title is required"),
    body("status").optional().isIn(["pending", "in-progress", "completed"]).withMessage("invalid status")
  ],
  controller.createTask
);
/*
  #swagger.tags = ['Tasks']
  #swagger.description = 'Create a new task'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Task data',
    required: true,
    schema: {
      $title: 'Finish project',
      status: 'pending'
    }
  }
  #swagger.responses[201] = { description: 'Task created successfully' }
  #swagger.responses[400] = { description: 'Validation error' }
*/
// Update an existing task by ID
router.put(
  "/:id",
  validateObjectId,
  [
    body("status").optional().isIn(["pending", "in-progress", "completed"]).withMessage("invalid status"),
    body("title").optional().notEmpty().withMessage("title cannot be empty")
  ],
  controller.updateTask
);
/*
  #swagger.tags = ['Tasks']
  #swagger.description = 'Update an existing task'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'Task ID'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated task data',
    schema: {
      title: 'Finish project ASAP',
      status: 'in-progress'
    }
  }
  #swagger.responses[200] = { description: 'Task updated successfully' }
  #swagger.responses[400] = { description: 'Validation error' }
  #swagger.responses[404] = { description: 'Task not found' }
*/
//  Delete a task by ID
router.delete("/:id", validateObjectId, controller.deleteTask);

module.exports = router;
