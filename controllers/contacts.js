const Contact = require('../models/contact');
const mongoose = require('mongoose');

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
      return res.status(400).json({ error: 'Invalid id format' });
    }
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

// Create contact
const createContact = async (req, res, next) => {
  //#swagger.tags=["Contacts"]
  try {
    const data = req.body;
    const contact = new Contact(data);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// Update contact
const updateContact = async (req, res, next) => {
  //#swagger.tags=["Contacts"]
  try {
    const id = req.params.id;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }
    const updated = await Contact.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Contact not found' });
    res.json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// Delete contact
const deleteContact = async (req, res, next) => {
  //#swagger.tags=["Contacts"]
  try {
    const id = req.params.id;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Contact not found' });
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
