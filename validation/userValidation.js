const Joi = require("joi");

const userCreate = Joi.object({
  firstName: Joi.string().trim().min(1).required(),
  lastName: Joi.string().trim().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const userUpdate = Joi.object({
  firstName: Joi.string().trim().min(1).optional(),
  lastName: Joi.string().trim().min(1).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional()
});

module.exports = {
  userCreate,
  userUpdate
};
