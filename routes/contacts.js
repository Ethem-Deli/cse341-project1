const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { saveContact } = require('../middleware/validation');
const validateObjectId = require('../middleware/validateObjectId');

// GET all contacts
router.get('/', contactsController.getAll);

// GET one contact
router.get('/:id', validateObjectId, contactsController.getSingle);

// CREATE new contact
router.post('/', saveContact, contactsController.createContact);

// UPDATE a contact
router.put('/:id', validateObjectId, saveContact, contactsController.updateContact);

// DELETE a contact
router.delete('/:id', validateObjectId, contactsController.deleteContact);

module.exports = router;
