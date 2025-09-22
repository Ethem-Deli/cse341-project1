const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");
const { saveContact } = require("../middleware/validation");
const validate = require("../middleware/validate");
const { contactCreate, contactUpdate } = require("../validation/contactValidation");
const { ensureAuthenticated } = require("../auth/middleware");
const validateObjectId = require("../middleware/validateObjectId");

// GET all contacts
router.get("/", contactsController.getAll);

// GET one contact
router.get("/:id", validateObjectId, contactsController.getSingle);

// CREATE new contact
router.post("/", ensureAuthenticated, validate(contactCreate), contactsController.createContact);
// UPDATE a contact
router.put("/:id", ensureAuthenticated, validateObjectId, validate(contactUpdate), contactsController.updateContact);

// DELETE a contact
router.delete("/:id", ensureAuthenticated, validateObjectId, contactsController.deleteContact);

module.exports = router;
