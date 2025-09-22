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
/*
  #swagger.tags = ['Contacts']
  #swagger.description = 'Create a new contact'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Contact data',
    required: true,
    schema: {
      $firstName: 'John',
      $lastName: 'Doe',
      $email: 'john@example.com',
      phone: '+97412345678'
    }
  }
  #swagger.responses[201] = { description: 'Contact created successfully' }
  #swagger.responses[400] = { description: 'Validation error' }
*/

// UPDATE a contact
router.put('/:id', validateObjectId, saveContact, contactsController.updateContact);
/*
  #swagger.tags = ['Contacts']
  #swagger.description = 'Update an existing contact'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Contact ID',
    required: true,
    type: 'string'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated contact data',
    required: true,
    schema: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '+97498765432'
    }
  }
  #swagger.responses[200] = { description: 'Contact updated successfully' }
  #swagger.responses[400] = { description: 'Validation error' }
  #swagger.responses[404] = { description: 'Contact not found' }
*/

// DELETE a contact
router.delete('/:id', validateObjectId, contactsController.deleteContact);

module.exports = router;
