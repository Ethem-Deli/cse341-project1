const router = require("express").Router();
const contactsController = require("../controllers/contacts");
const validate = require("../middleware/validate");
const { contactCreate, contactUpdate } = require("../validation/contactValidation");
const { ensureAuthenticated } = require("../middleware/ensureAuth");

// Public: view contacts
router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getSingle);

// Protected: create/update/delete
router.post("/", ensureAuthenticated, validate(contactCreate), contactsController.createContact);
router.put("/:id", ensureAuthenticated, validate(contactUpdate), contactsController.updateContact);
router.delete("/:id", ensureAuthenticated, contactsController.deleteContact);

module.exports = router;
