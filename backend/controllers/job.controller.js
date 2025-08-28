import { Job } from "../models/job.model.js";

//* For students -: Host by Admin
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id; // Logged-in user's id from isAuthenticated middleware

    // 🔹 Check for missing required fields
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }

    // 🔹 Avoid duplicate jobs for same company/location/title
    const existingJob = await Job.findOne({
      title,
      company: companyId,
      location,
    });
    if (existingJob) {
      return res.status(409).json({
        message: "Job already exists for this company at this location",
        success: false,
      });
    }

    //* Create Job-:
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), // convert comma-separated string to array
      salary,
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId, // link job to creator
    });

    return res.status(201).json({
      message: "New Job is created Successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Job creation failed:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message, // send error message for debugging
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; // search keyword (query param)
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } }, // case-insensitive search
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company", // populate company details instead of just companyId
      })
      .sort({ createdAt: -1 }); // latest jobs first

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not Found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// find job by id
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // path param
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// * Get all jobs created by current admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // get logged-in admin's id
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(400).json({
        message: "Jobs not Found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
