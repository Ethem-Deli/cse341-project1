const validator = require("validator.js");
const validator = (body, rules, customMessages, callback) => {
    const validation = new validator.Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;