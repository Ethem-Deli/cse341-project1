const mongoose = require("mongoose");
// Define the Contact schema
const contactSchema = new mongoose.Schema(
  // Define fields with types and validation
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, match: /.+\@.+\..+/ },// Basic email format validation
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true },
    notes: { type: String }
  },
  // Schema options
  { timestamps: true }// Automatically manage createdAt and updatedAt fields
);
// Create and export the Contact model
module.exports = mongoose.model("Contact", contactSchema);// "Contact" is the model name used in MongoDB collection