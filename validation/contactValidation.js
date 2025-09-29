const Joi = require("joi");

const base = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  favoriteColor: Joi.string().allow(""),
  birthday: Joi.date().allow(""),
  phone: Joi.string().allow(""),
  address: Joi.string().allow(""),
  city: Joi.string().allow(""),
  state: Joi.string().allow(""),
  country: Joi.string().allow(""),
  notes: Joi.string().allow("")
};

exports.contactCreate = Joi.object(base);
exports.contactUpdate = Joi.object(base);