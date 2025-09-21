const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// Get all contacts
const getAll = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    const result = await mongodb.getDb().db().collection("contacts").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving contacts", error: err.message });
  }
};

// Get a single contact by its ID
const getSingle = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Must use a valid contact id to find a contact." });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection("contacts").findOne({ _id: userId });
    if (!result) return res.status(404).json({ message: "Contact not found" });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving contact", error: err.message });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection("contacts").insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ message: "Contact created", id: response.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create contact" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error creating contact", error: err.message });
  }
};

// Update a contact by its ID
const updateContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Must use a valid contact id to update a contact." });
    }
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .replaceOne({ _id: userId }, contact);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Contact updated successfully" });
    } else {
      res.status(404).json({ message: "Contact not found or no changes made" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating contact", error: err.message });
  }
};

// Delete a contact by its ID
const deleteContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Must use a valid contact id to delete a contact." });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection("contacts").deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Contact deleted successfully" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting contact", error: err.message });
  }
};

// Export all functions
module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};

// Note: To add Swagger documentation, use the //#swagger.tags=["TagName"] comment above each function
// Replace "TagName" with the appropriate tag for each function (e.g., "Contacts", "Users")
// This will help organize the endpoints in the Swagger UI
// Ensure that the swagger.js file is set up to scan this controller file for annotations