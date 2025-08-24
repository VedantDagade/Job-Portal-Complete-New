import mongoose from "mongoose";

// Application Schema (for job applications by students)
const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // link to the job being applied for
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link to student (user who applied)
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"], // application status
      default: "pending", // default when applied
    },
  },
  { timestamps: true }
); // auto add createdAt & updatedAt

export const Application = mongoose.model("Application", applicationSchema);    
// Model for 'applications' collection → CRUD with applicationSchema