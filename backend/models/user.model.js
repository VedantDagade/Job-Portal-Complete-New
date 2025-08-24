import mongoose from "mongoose";

// Job Schema (for storing job postings)
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // job title
    },
    description: {
      type: String,
      required: true, // job details/summary
    },
    requirements: [
      {
        type: String, // skills/requirements list
      },
    ],
    salary: {
      type: Number,
      required: true, // offered salary
    },
    location: {
      type: String,
      required: true, // job location
    },
    jobType: {
      type: String,
      required: true, // full-time/part-time etc.
    },
    position: {
      type: Number,
      required: true, // number of openings
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // link job → company
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // recruiter (User who posted the job)
      required: true,
    },
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application", // list of applications for this job
      },
    ],
  },
  { timestamps: true }
); // auto add createdAt & updatedAt

export const Job = mongoose.model("Job", jobSchema); // Model for 'jobs' collection → used for CRUD with jobSchema
