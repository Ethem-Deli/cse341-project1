const Contact = require("../models/contact");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { contactCreate, contactUpdate } = require("../validation/contactValidation");
const { ensureAuthenticated } = require("../auth/middleware"); // optional auth middleware

// Get all contacts
const getAll = async (req, res, next) => {
  //#swagger.tags=["Contacts"]
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

// Get single contact
const getSingle = async (req, res, next) => {
  //#swagger.tags=["Contacts"]
  try {
    const id = req.params.id;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id format" });
    }
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

// Create contact
const createContact = async (req, res, next) => {
  //#swagger.tags=["Contacts"]
  /*
  #swagger.tags = ["Contacts"]
  #swagger.description = "Create a new contact"
  #swagger.parameters["body"] = {
    in: "body",
    description: "Contact data",
    required: true,
    schema: {
      $firstName: "John",
      $lastName: "Doe",
      $email: "john@example.com",
      $favoriteColor: "blue",
      $birthday: "1990-01-01",
      $phone: "123-456-7890",
      $address: "123 Main St",
      $city: "Anytown",
      $state: "CA",
      $country: "USA",
      $notes: "Some notes about the contact"
    }
  }
  #swagger.responses[201] = { description: "Contact created successfully" }
  #swagger.responses[400] = { description: "Validation error" }
*/
  try {
    const data = req.body;
    const contact = new Contact(data);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    // Mongoose validation error
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// Update contact
const updateContact = async (req, res, next) => {
  //#swagger.tags=["Contacts"]
  /*
  #swagger.tags = ["Contacts"]
  #swagger.description = "Update an existing contact"
  #swagger.parameters["id"] = {
    in: "path",
    description: "Contact ID",
    required: true,
    type: "string"
  }
  #swagger.parameters["body"] = {
    in: "body",
    description: "Updated contact data",
    required: true,
    schema: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      favoriteColor: "blue",
      birthday: "1990-01-01",
      phone: "123-456-7890",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      country: "USA",
      notes: "Some notes about the contact",
    }
  }
  #swagger.responses[200] = { description: "Contact updated successfully" }
  #swagger.responses[400] = { description: "Validation error" }
  #swagger.responses[404] = { description: "Contact not found" }
*/
  try {
    const id = req.params.id;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id format" });
    }
    const updated = await Contact.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: "Contact not found" });
    res.json(updated);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// Delete contact
const deleteContact = async (req, res, next) => {
  //#swagger.tags=["Contacts"]
  /*
  #swagger.tags = ["Contacts"]
  #swagger.description = "Delete a contact by ID"
  #swagger.parameters["id"] = {
    in: "path",
    required: true,
    type: "string",
    description: "Contact ID"
  }
  #swagger.responses[204] = { description: "Contact deleted successfully" }
  #swagger.responses[404] = { description: "Contact not found" }
*/
  try {
    const id = req.params.id;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id format" });
    }
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Contact not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
