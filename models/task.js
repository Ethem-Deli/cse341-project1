const mongoose = require("mongoose");
// Define the Task schema
const taskSchema = new mongoose.Schema(
  {
    // Define fields with types and validation
    title: { type: String, required: true },
    description: { type: String },
    status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
    },
    priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
    },
    dueDate: { type: Date }
  },
  // Schema options
  { timestamps: true }// Automatically manage createdAt and updatedAt fields
);
// Create and export the Task model
module.exports = mongoose.model("Task", taskSchema);//"Task" is the model name used in MongoDB collection
//**END**