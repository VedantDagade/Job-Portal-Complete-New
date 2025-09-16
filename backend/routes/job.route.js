import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import { Job } from "../models/job.model.js";
import { deleteJobById, getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", getAllJobs);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);
router.get("/get/:id", isAuthenticated, getJobById);

//For Delete Job
router.delete("/delete/:id", isAuthenticated, deleteJobById);


export default router;
