const express = require("express");
const validate = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");
const usersController = require("../controllers/users");
const { userCreate, userUpdate } = require("../validation/userValidation");

const router = express.Router();

// GET all users
router.get("/", usersController.getAll);

// GET one user by ID
router.get("/:id", validateObjectId, usersController.getSingle);

// CREATE new user
/**
 * @route POST /users
 * @security bearerAuth
 */
router.post("/", validate(userCreate), usersController.createUser);

// UPDATE user by ID
/**
 * @route PUT /users/{id}
 * @security bearerAuth
 */
router.put("/:id", validateObjectId, validate(userUpdate), usersController.updateUser);

// DELETE user by ID
/**
 * @route DELETE /users/{id}
 * @security bearerAuth
 */
router.delete("/:id", validateObjectId, usersController.deleteUser);

module.exports = router;
