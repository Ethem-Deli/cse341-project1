const Joi = require("joi");

const contactCreate = Joi.object({
  firstName: Joi.string().trim().min(1).required(),
  lastName: Joi.string().trim().min(1).required(),
  email: Joi.string().email().required(),
  favoriteColor: Joi.string().allow("").optional(),
  birthday: Joi.date().iso().required(),
  phone: Joi.string().trim().min(7).required(),
  address: Joi.string().allow("").optional(),
  city: Joi.string().allow("").optional(),
  state: Joi.string().allow("").optional(),
  zip: Joi.string().allow("").optional(),
  notes: Joi.string().allow("").optional()
});

// For updates: all fields optional
const contactUpdate = contactCreate.fork(
  ["firstName", "lastName", "email", "favoriteColor", "birthday", "phone", "address", "city", "state", "zip", "notes"],
  (schema) => schema.optional()
);

module.exports = {
  contactCreate,
  contactUpdate
};
