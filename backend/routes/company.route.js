import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";

const router = express.Router();

// ✅ Correct usage
router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById); // logout usually a GET route
router.put("/update/:id", isAuthenticated, updateCompany);

export default router;
