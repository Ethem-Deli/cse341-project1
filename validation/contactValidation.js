const Joi = require("joi");

const contactCreate = Joi.object({
  firstName: Joi.string().trim().min(1).required(),
  lastName: Joi.string().trim().min(1).required(),
  email: Joi.string().email().required(),
  favoriteColor: Joi.string().allow("").optional(),
  birthday: Joi.date().iso().required(),
  phone: Joi.string().pattern(/^[0-9+\-()\s]{7,20}$/).required(),
  address: Joi.string().allow("").optional(),
  city: Joi.string().allow("").optional(),
  state: Joi.string().allow("").optional(),
  country: Joi.string().allow("").optional(),
  zip: Joi.string().pattern(/^[A-Za-z0-9\s-]{3,10}$/).optional(),
  notes: Joi.string().max(1000).allow("").optional(),
});

// For updates: all fields optional
const contactUpdate = contactCreate.fork(
  ["firstName", "lastName", "email", "favoriteColor", "birthday", "phone", "address", "city", "state", "country", "zip", "notes"],
  (schema) => schema.optional()
);

module.exports = {
  contactCreate,
  contactUpdate
};
