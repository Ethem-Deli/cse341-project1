const User = require("../models/user");
const mongoose = require("mongoose");

// Get all users
const getAll = async (req, res, next) => {
  //#swagger.tags=["Users"]
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Get single user
const getSingle = async (req, res, next) => {
  //#swagger.tags=["Users"]
  try {
    const id = req.params.id;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id format" });
    }
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Create user
const createUser = async (req, res, next) => {
  //#swagger.tags=["Users"]
  /*
    #swagger.tags = ["Users"]
    #swagger.description = "Create a new user"
    #swagger.parameters["body"] = {
      in: "body",
      description: "User details",
      required: true,
      schema: {
        $firstName: "John",
        $lastName: "Doe",
        $email: "john@example.com",
        $password: "secret123"
      }
    }
    #swagger.responses[201] = { description: "User created successfully" }
    #swagger.responses[400] = { description: "Validation error" }
  */
  try {
    const data = req.body;
    const user = new User(data);
    await user.save();
    const out = user.toObject();
    delete out.password;
    res.status(201).json(out);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// Update user
const updateUser = async (req, res, next) => {
  //#swagger.tags=["Users"]
  /*
  #swagger.tags = ["Users"]
  #swagger.description = "Update an existing user"
  #swagger.parameters["id"] = {
    in: "path",
    required: true,
    type: "string",
    description: "User ID"
  }
  #swagger.parameters["body"] = {
    in: "body",
    description: "Updated user details",
    schema: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      password: "newpassword123"
    }
  }
  #swagger.responses[200] = { description: "User updated successfully" }
  #swagger.responses[400] = { description: "Validation error" }
  #swagger.responses[404] = { description: "User not found" }
*/
  try {
    const id = req.params.id;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id format" });
    }
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).select("-password");
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  //#swagger.tags=["Users"]
  /*
  #swagger.tags = ["Users"]
  #swagger.description = "Delete a user by ID"
  #swagger.parameters["id"] = {
    in: "path",
    required: true,
    type: "string",
    description: "User ID"
  }
  #swagger.responses[204] = { description: "User deleted successfully" }
  #swagger.responses[404] = { description: "User not found" }
*/
  try {
    const id = req.params.id;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id format" });
    }
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
