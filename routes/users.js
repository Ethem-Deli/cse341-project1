const express = require('express');
const { body, validationResult } = require('express-validator');
const validateObjectId = require('../middleware/validateObjectId');
const usersController = require('../controllers/users');

const router = express.Router();

const userValidation = [
  body('firstName').notEmpty().withMessage('First name required'),
  body('lastName').notEmpty().withMessage('Last name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
//Routes
// GET all users
router.get('/', usersController.getAll);

// GET one user by ID
router.get('/:id', validateObjectId, usersController.getSingle);

// CREATE new user
router.post('/', userValidation, usersController.createUser);
/*
  #swagger.tags = ['Users']
  #swagger.description = 'Create a new user'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'User details',
    required: true,
    schema: {
      $firstName: 'John',
      $lastName: 'Doe',
      $email: 'john@example.com',
      $password: 'secret123'
    }
  }
  #swagger.responses[201] = { description: 'User created successfully' }
  #swagger.responses[400] = { description: 'Validation error' }
*/

router.put('/:id', validateObjectId, userValidation, usersController.updateUser);
/*
  #swagger.tags = ['Users']
  #swagger.description = 'Update an existing user'
  #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'string',
    description: 'User ID'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated user details',
    schema: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'newpassword123'
    }
  }
  #swagger.responses[200] = { description: 'User updated successfully' }
  #swagger.responses[400] = { description: 'Validation error' }
  #swagger.responses[404] = { description: 'User not found' }
*/
router.delete('/:id', validateObjectId, usersController.deleteUser);

module.exports = router;