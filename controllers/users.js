const User = require("../models/user");

exports.getAll = async (req, res, next) => {
  /* GET all users
   #swagger.tags = ["Users"]
   #swagger.security = [{ "bearerAuth": [] }]
*/
  try {
    const users = await User.find().select("-password"); // don’t send hashed passwords
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getSingle = async (req, res, next) => {
  /* GET single user
   #swagger.tags = ["Users"]
   #swagger.security = [{ "bearerAuth": [] }]
*/
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};


exports.createUser = async (req, res, next) => {
  /* CREATE user
   #swagger.tags = ["Users"]
   #swagger.security = [{ "bearerAuth": [] }] // if you want register protected
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
    const user = new User(req.body); // bcrypt runs in pre-save
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  /* UPDATE user
   #swagger.tags = ["Users"]
   #swagger.security = [{ "bearerAuth": [] }]
*/
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
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  /* DELETE user
   #swagger.tags = ["Users"]
   #swagger.security = [{ "bearerAuth": [] }]
*/
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
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};
