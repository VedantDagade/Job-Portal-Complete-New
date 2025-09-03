import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload , multiUpload} from "../middlewares/multer.js";
import { getCurrentUser} from "../controllers/user.controller.js"


const router = express.Router();

//User Router
// Correct usage
router.post("/register",multiUpload, register);
router.post("/login", login);
router.get("/logout", logout); // logout usually a GET route
router.put("/profile/update", isAuthenticated, singleUpload,updateProfile);

export default router;
