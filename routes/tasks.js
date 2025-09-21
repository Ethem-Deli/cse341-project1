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
//  Delete a task by ID
router.delete("/:id", validateObjectId, controller.deleteTask);

module.exports = router;
