const mongoose = require('mongoose');
// Define the Task schema
const taskSchema = new mongoose.Schema(
  {
    // Define fields with types and validation
    title: { type: String, required: true, trim: true },// Task title is required
    description: { type: String, trim: true },// Optional description
    dueDate: { type: Date },// Optional due date
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },// Status with limited options
    priority: { type: Number, min: 1, max: 5, default: 3 },// Priority from 1 (highest) to 5 (lowest) with default 3
    tags: [{ type: String }]// Array of tags as strings
  },
  // Schema options
  { timestamps: true }// Automatically manage createdAt and updatedAt fields
);
// Create and export the Task model
module.exports = mongoose.model('Task', taskSchema);//'Task' is the model name used in MongoDB collection
