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

router.put('/:id', validateObjectId, userValidation, usersController.updateUser);

// DELETE user by ID
router.delete('/:id', validateObjectId, usersController.deleteUser);

module.exports = router;