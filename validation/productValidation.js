const Joi = require("joi");

const productCreate = Joi.object({
  name: Joi.string().trim().min(1).required(),
  description: Joi.string().allow("").optional(),
  price: Joi.number().positive().required(),
  inStock: Joi.boolean().optional(),
  category: Joi.string().allow("").optional()
});

const productUpdate = productCreate;

module.exports = {
  productCreate,
  productUpdate
};
