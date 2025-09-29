const router = require("express").Router();
const tasksController = require("../controllers/tasks");
const validate = require("../middleware/validate");
const { taskCreate, taskUpdate } = require("../validation/taskValidation");
const { ensureAuthenticated } = require("../middleware/ensureAuth");

// CREATE new task
router.post("/", ensureAuthenticated, validate(taskCreate), tasksController.createTask);

// GET all tasks
router.get("/", tasksController.getAll);

// GET single task by ID
router.get("/:id", tasksController.getSingle);

// UPDATE task
router.put("/:id", ensureAuthenticated, validate(taskUpdate), tasksController.updateTask);

// DELETE task
router.delete("/:id", ensureAuthenticated, tasksController.deleteTask);

module.exports = router;
