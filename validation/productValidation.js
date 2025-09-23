const Joi = require("joi");

const productCreate = Joi.object({
  name: Joi.string().trim().min(1).required(),
  description: Joi.string().allow("").optional(),
  price: Joi.number().positive().required(),
  inStock: Joi.boolean().required(),   // must be required to match model
  category: Joi.string().allow("").optional(),
  quantity: Joi.number().integer().min(0).required(),  // required number, no empty string
  sku: Joi.string().trim().min(1).required()
});

// For updates, usually make fields optional (PATCH/PUT flexibility)
const productUpdate = Joi.object({
  name: Joi.string().trim().min(1).optional(),
  description: Joi.string().allow("").optional(),
  price: Joi.number().positive().optional(),
  inStock: Joi.boolean().optional(),
  category: Joi.string().allow("").optional(),
  quantity: Joi.number().integer().min(0).optional(),
  sku: Joi.string().trim().min(1).optional()
});

module.exports = {
  productCreate,
  productUpdate
};
