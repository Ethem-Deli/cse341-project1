const validator = require("../helpers/validate");

const saveContact = (req, res, next) => {
    const validationRules = {
        firstName:"required|string",
        lastName:"required|string",
        email:"required|email", 
        favoriteColor:"string",
        birthday:"string"
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveContact
};
