const router = require("express").Router();
const usersController = require("../controllers/users");
const validate = require("../middleware/validate");
const { userCreate, userUpdate } = require("../validation/userValidation");
const { ensureAuthenticated } = require("../middleware/ensureAuth");

// GET all users (protected)
router.get("/", ensureAuthenticated, usersController.getAll);

// GET user by ID (protected)
router.get("/:id", ensureAuthenticated, usersController.getSingle);

// POST create user (protected or open depending on your app)
router.post("/", ensureAuthenticated, validate(userCreate), usersController.createUser);

// PUT update user
router.put("/:id", ensureAuthenticated, validate(userUpdate), usersController.updateUser);

// DELETE user
router.delete("/:id", ensureAuthenticated, usersController.deleteUser);

module.exports = router;
