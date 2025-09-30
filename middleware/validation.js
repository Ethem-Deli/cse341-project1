// middleware/validation.js
const { body, validationResult } = require("express-validator");

// Validation for saving/updating a contact
const saveContact = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("favoriteColor").notEmpty().withMessage("Favorite color is required"),
  body("birthday").isISO8601().withMessage("Birthday must be a valid date"),
  body("phone").optional().isString().withMessage("Phone must be text"),
  body("address").optional().isString().withMessage("Address must be text"),
  body("city").optional().isString().withMessage("City must be text"),
  body("state").optional().isString().withMessage("State must be text"),
  body("country").optional().isString().withMessage("Country must be text"),
  body("notes").optional().isString().withMessage("Notes must be text"),

  // Run the validation result check
  (req, res, next) => {
    // Gather validation errors
    const errors = validationResult(req);
    // If there are errors, return them
    if (!errors.isEmpty()) {
      // Return standardized error response
      return res.status(400).json({ errors: errors.array() });
    }
    // If no errors, proceed to the next middleware/controller
    next();
  },
];
// Export the validation middleware
module.exports = { saveContact };
