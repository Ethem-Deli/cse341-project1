const mongoose = require('mongoose');

// Middleware to validate ObjectId in request parameters
function validateObjectId(req, res, next) {
  // Skip validation if no id parameter
  const id = req.params.id;
  if (!id) return next();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id format' });// Bad Request if id is not valid 
  }
  next();
}
// Export the middleware function
module.exports = validateObjectId;
