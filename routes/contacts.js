const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");
const { saveContact } = require("../middleware/validation");

// GET all contacts
router.get("/", contactsController.getAll);

// GET one contact
router.get("/:id", contactsController.getSingle);

// CREATE new contact
router.post("/", saveContact, contactsController.createContact);

// UPDATE a contact
router.put("/:id", saveContact, contactsController.updateContact);

// DELETE a contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
