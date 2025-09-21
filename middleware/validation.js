// middleware/validation.js
const { body, validationResult } = require("express-validator");

// Validation for saving/updating a contact
const saveContact = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("address").optional().isString().withMessage("Address must be text"),
  body("city").optional().isString().withMessage("City must be text"),
  body("state").optional().isString().withMessage("State must be text"),
  body("postalCode").optional().isString().withMessage("Postal code must be text"),
  body("country").optional().isString().withMessage("Country must be text"),
  body("notes").optional().isString().withMessage("Notes must be text"),
  // Run the validation result check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return standardized error response
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { saveContact };
