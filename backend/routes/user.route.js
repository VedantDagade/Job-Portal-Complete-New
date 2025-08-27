import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ✅ Correct usage
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout); // logout usually a GET route
router.put("/profile/update", isAuthenticated, updateProfile);

export default router;
