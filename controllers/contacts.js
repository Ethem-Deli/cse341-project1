const Contact = require("../models/contact");

exports.getAll = async (req, res, next) => {
  /* GET all contacts
   #swagger.tags = ["Contacts"]
*/
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

exports.getSingle = async (req, res, next) => {
  /* GET single contact
   #swagger.tags = ["Contacts"]
*/
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

exports.createContact = async (req, res, next) => {
  /*CREATE contact
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
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

exports.updateContact = async (req, res, next) => {
  /* UPDATE contact
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
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Contact not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  /* DELETE contact
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
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
};
