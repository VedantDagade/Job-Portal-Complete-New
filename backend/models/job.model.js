import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // job title
  },
  description: {
    type: String,
    required: true, // job details
  },
  requirements: [
    {
      type: String, // skills/requirements
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
    required: true, // no. of openings
  },
  company: {
    type: mongoose.Schema.Types.ObjectId, // 🔗 reference to Company collection
    ref: "Company", // connects job → company details
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId, // 🔗 recruiter (User who created job)
    required: true,
  },
  application: [
    {
      type: mongoose.Schema.Types.ObjectId, // 🔗 list of Applications for this job
      ref: "Application",
    },
  ],
});



export const job = mongoose.model("Job", jobSchema);

