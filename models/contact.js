const mongoose = require("mongoose");
// Define the Contact schema
const contactSchema = new mongoose.Schema(
  // Define fields with types and validation
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, match: /.+\@.+\..+/ },// Basic email format validation
    birthday: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: false, trim: true },
    city: { type: String, required: false, trim: true },
    state: { type: String, required: false, trim: true },
    zip: { type: String, required: false, trim: true },
    notes: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
  },
  
  // Schema options
  // Automatically manage createdAt and updatedAt fields
  { timestamps: true });

// Create and export the Contact model
module.exports = mongoose.model("Contact", contactSchema);// "Contact" is the model name used in MongoDB collection