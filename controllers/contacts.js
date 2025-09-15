const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all contacts
const getAll = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    const result = await mongodb.getDatabase().collection("contacts").find();
    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single contact
const getSingle = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .find({ _id: contactId });
    result.toArray().then((contacts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(contacts[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb.getDatabase().collection("contacts").insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: "Error creating contact" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update contact
const updateContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb.getDatabase().collection("contacts").replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Delete contact
const deleteContact = async (req, res) => {
  //#swagger.tags=["Contacts"]
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection("contacts").deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export all functions
module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
// Note: To add Swagger documentation, use the //#swagger.tags=["TagName"] comment above each function
// Replace "TagName" with the appropriate tag for each function (e.g., "Contacts", "Users")
// This will help organize the endpoints in the Swagger UI
// Ensure that the swagger.js file is set up to scan this controller file for annotations