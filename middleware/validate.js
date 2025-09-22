// validate.js - wraps Joi schemas for Express
module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: true, convert: true });
  if (error) {
    error.status = 400;
    return next(error);
  }
  req.body = value;
  next();
};
