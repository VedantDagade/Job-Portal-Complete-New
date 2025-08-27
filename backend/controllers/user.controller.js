//* Business Logic (Register, Login, Logout, Update Profile Controllers)

import { User } from "../models/user.model.js"; // Import User model (schema)
import bcrypt from "bcryptjs"; // For hashing passwords (security)
import jwt from "jsonwebtoken"; // For generating JWT tokens (authentication)

// --------- REGISTER CONTROLLER --------
export const register = async (req, res) => {
  try {
    // Get user data from request body
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Validation: check if any required field is missing
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Check if user already exists with same email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }

    // Hash the password before saving to DB
    // SaltRounds = 10 → more rounds = stronger but slower
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in DB
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    // Success response
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error); // Error logging for debugging
  }
};

// --------- LOGIN CONTROLLER -----------------
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validation: ensure all fields provided
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Compare entered password with hashed password in DB
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Check if role matches (student/recruiter)
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    // Create token payload (data stored inside JWT)
    const tokenData = {
      userId: user._id, // Unique identifier of user
    };

    // Generate JWT token with secret key & expiry time
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d", // Token valid for 1 day
    });

    // Prepare user data to send back (without password)
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Store token in secure cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // Expiry = 1 day
        httpOnly: true, // JS on frontend cannot access cookie → prevents XSS
        sameSite: "strict", // Prevents CSRF attacks
        // secure: true (enable in production for HTTPS only)
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user, // sending back user info as well
      });
  } catch (error) {
    console.log(error);
  }
};

// ---------------- LOGOUT CONTROLLER -----------------
export const logout = async (req, res) => {
  try {
    // Clear the cookie by setting maxAge=0
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// ---------------- UPDATE PROFILE CONTROLLER -----------------
export const updateProfile = async (req, res) => {
  try {
    // Get updated fields from body
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // profile/resume file uploaded (if any)

    // Basic validation
    if (!fullname) {
      return res.status(400).json({
        message: "Something is missing",
        success: true,
      });
    }

    // cloudinary upload logic will come here for profile/resume

    // Convert skills string → array
    const skillsArray = skills.split(",");

    // userId comes from authentication middleware
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // Update user fields
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;

    // Resume handling logic will come here

    await user.save(); // Save updated user in DB

    // Send back updated user without password
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
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

//* Detailed Explanation for Revision:
/*  
===================== AUTHENTICATION NOTES =====================

👉 Why JWT (JSON Web Token)?
- JWT is like a "Digital ID card" for the user.
- After login, server generates a JWT signed with a secret key.
- It contains user info (userId, role, etc.).
- Client sends this token with each request → server verifies → gives access.
- Advantage: Stateless (server does not need to store session data in DB).

👉 Why Cookies?
- JWT needs to be stored on client side.
- Options:
   1) localStorage/sessionStorage → less secure (can be stolen using XSS attacks).
   2) Cookies → more secure because:
        - httpOnly: true → JS cannot read it.
        - sameSite: "strict" → prevents CSRF attacks.
        - secure: true (in production) → only sent over HTTPS.
- Cookies also automatically send JWT with each request → no need to manually attach token.

👉 Why Both Together (JWT + Cookies)?
- JWT = proof of identity (auth mechanism).
- Cookies = secure storage + automatic sending of JWT.
- Together → secure, stateless, and user-friendly authentication.

⚖️ Example Flow:
1. User logs in → Server creates JWT (contains userId).
2. JWT is stored in Cookie → sent to browser.
3. On every request → Cookie automatically carries JWT.
4. Server verifies JWT → knows user is logged in → gives access.

===============================================================
*/
