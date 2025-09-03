//* Business Logic (Register, Login, Logout, Update Profile Controllers)

import { User } from "../models/user.model.js"; // Import User model (schema)
import bcrypt from "bcryptjs"; // For hashing passwords (security)
import jwt from "jsonwebtoken"; // For generating JWT tokens (authentication)
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// --------- REGISTER CONTROLLER --------
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Validation
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    // Check existing user
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({
          message: "User already exists with this email.",
          success: false,
        });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res
      .status(201)
      .json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// --------- LOGIN CONTROLLER -----------------
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validation
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    // Find user
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password.", success: false });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password.", success: false });
    }

    // Role check
    if (role !== user.role) {
      return res
        .status(400)
        .json({
          message: "Account doesn't exist with current role.",
          success: false,
        });
    }

    // JWT payload
    const tokenData = { userId: user._id };

    // Generate JWT
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Prepare safe user object
    const safeUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Send token in cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user: safeUser,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// ---------------- LOGOUT CONTROLLER -----------------
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// ---------------- UPDATE PROFILE CONTROLLER -----------------
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // Update basic fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());

    // If no file uploaded → just save & return
    if (!file) {
      await user.save();

      const safeUser = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      };

      return res.status(200).json({
        message: "Profile Updated Successfully",
        user: safeUser,
        success: true,
      });
    }

    // ✅ Upload resume to Cloudinary (stream)
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // auto-detect pdf/doc/docx
        folder: "resumes",
        public_id: file.originalname.split(".")[0],
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res
            .status(500)
            .json({ message: "File upload failed", success: false });
        }

        user.profile.resume = result.secure_url;
        user.profile.resumeOriginalName = file.originalname;
        await user.save();

        const safeUser = {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile,
        };

        return res.status(200).json({
          message: "Profile Updated Successfully",
          user: safeUser,
          success: true,
        });
      }
    );


    uploadStream.end(file.buffer); // ✅ Send buffer to Cloudinary
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


/*
===================== IMPORTANT CONCEPTS USED =====================

1] Validation → ensures required fields are present.
2] bcrypt.js → used to hash passwords for security.
3] JWT (jsonwebtoken) → used for authentication, provides tokens after login.
4] Cookies → store the token in browser securely.
5] MongoDB + Mongoose → user data storage and retrieval.

==================================================================
*/

/*  
===================== AUTHENTICATION NOTES =====================

👉 Why JWT?
- JWT acts like a digital ID card.
- After login, server issues a signed JWT containing user info.
- Client sends it back with requests → server verifies → grants access.
- Advantage: Stateless (no server-side sessions needed).

👉 Why Cookies?
- Safer than localStorage for storing tokens.
- httpOnly → JS cannot read it (prevents XSS).
- sameSite: "strict" → prevents CSRF.
- secure: true (only HTTPS in production).

👉 Flow:
1. User logs in → Server generates JWT.
2. Token stored in cookie.
3. Every request auto-sends cookie.
4. Server verifies JWT → authenticates user.

===============================================================
*/
