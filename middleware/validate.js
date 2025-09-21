const validator = require("../helpers/validate");

// Middleware to validate contact data
const saveContact = (req, res, next) => {
    // Define validation rules
    const validationRules = {
        firstName:"required|string",
        lastName:"required|string",
        email:"required|email", 
        favoriteColor:"string",
        birthday:"string"
    };
    // Perform validation
    validator(req.body, validationRules, {}, (err, status) => {
        // If validation fails, respond with 412 and error details
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",// details of the validation errors
                data: err
            });
        } else {
            // If validation passes, proceed to the next middleware or route handler
            next();
        }
    });
};

module.exports = {
    saveContact
};
