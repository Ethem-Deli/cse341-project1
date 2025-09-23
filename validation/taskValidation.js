const Joi = require("joi");

const taskCreate = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().allow("").optional(),
  status: Joi.string().valid("pending", "in-progress", "completed").required(),
  priority: Joi.string().valid("low", "medium", "high").optional(),
  dueDate: Joi.date().iso().optional()
});

// For updates: all fields optional
const taskUpdate = Joi.object({
  title: Joi.string().trim().min(1).optional(),
  description: Joi.string().allow("").optional(),
  status: Joi.string().valid("pending", "in-progress", "completed").optional(),
  priority: Joi.string().valid("low", "medium", "high").optional(),
  dueDate: Joi.date().iso().optional()
});

module.exports = {
  taskCreate,
  taskUpdate
};

//**END**