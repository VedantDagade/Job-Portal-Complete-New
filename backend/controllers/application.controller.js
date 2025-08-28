import express from "express";

import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Apply for a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.id; // authenticated user id from JWT
    const jobId = req.params.id; // job id from URL

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is Required",
        success: false,
      });
    }

    // Check duplicate application → prevent multiple applies
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this jobs.",
        success: false,
      });
    }

    // Verify job exists before applying
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    //* Create new application → MongoDB insert
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Save application reference in Job → one-to-many relation
    job.application.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job Applied Successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error); // error logging → important for debugging
  }
};

// Get all jobs applied by logged-in user
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    // Find applications + populate job & company → nested populate
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 }) // latest first
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company", // populate company inside job
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "No Application",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Admin: see all applicants for a job
export const getApplicants = async (req, res) => {
  try {
    const { id } = req.params; // job id from URL

    // Populate all applications + applicant details → one-to-many
    const job = await Job.findById(id).populate({
      path: "application",
      options: { sort: { createdAt: -1 } }, // latest first
      populate: {
        path: "applicant", // user details
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
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

// Admin: update application status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    // Find application by id → single document update
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "application not found",
        success: false,
      });
    }

    // Update status field → enum validation handled by Mongoose
    application.status = status.toLowerCase();
    await application.save();

    return res.status(201).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {}
};



/*
1] req.params.id → route param, req.id → authenticated user id.

2] findOne vs find → findOne for single doc, find for array.

3] populate → populate referenced collections (1:M or M:1).

4] enum in schema → restrict allowed values, used in status.

5] Push _id to array field → link between collections.

6] Always check existence → prevent invalid DB operations.
*/