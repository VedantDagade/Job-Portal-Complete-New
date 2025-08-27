// Import mongoose and Schema constructor
import mongoose, { Schema } from "mongoose";

// Define a new User schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,         // Data type is String
    required: true,       // Field must be provided (validation rule)
  },
  email: {
    type: String,
    required: true,
    unique: true,         // Ensures no two users can have the same email
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    // Enum-like validation → user must be either "student" or "recruiter"
    type: [String],
    enum: ["student", "recruiter"],
    required: true,
  },
  profile: {
    bio: { type: String },               // Short about user
    skills: [{ type: String }],          // Array of strings (multiple skills)
    resume: { type: String },            // Stores URL of uploaded resume
    resumeOriginalName: { type: String}, // Keeps original filename of resume
    company: {
      // Reference to another collection (Relationship with Company model)
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    profilePhoto: {
      type: String,
      default: ""                        // Default value if not provided
    }
  },
}, { timestamps: true }); // Adds createdAt & updatedAt fields automatically

// Create and export User model from schema
export const User = mongoose.model("User", userSchema);
