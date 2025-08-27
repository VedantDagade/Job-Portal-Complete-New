// ---------------------------
// IMPORTS (Packages & Files)
// ---------------------------
import express from "express"; // Framework to build server & REST APIs
import cookieParser from "cookie-parser"; // Parse cookies (used for JWT/auth sessions)
import cors from "cors"; // Handle cross-origin requests (Frontend <-> Backend)
import dotenv from "dotenv"; // Load environment variables from .env
import connectDB from "./utils/db.js"; // MongoDB connection utility

// Importing Routes
import userRoute from "./routes/user.route.js";

// ---------------------------
// ENVIRONMENT CONFIG
// ---------------------------
dotenv.config({}); // Load .env file (e.g., PORT, DB_URI, JWT_SECRET, etc.)

// ---------------------------
// EXPRESS APP INITIALIZATION
// ---------------------------
const app = express();

// ---------------------------
// TEST ROUTE (Health Check)
// ---------------------------
app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I am coming from backend ✅",
    success: true,
  });
});

/* ---------------------------
   MIDDLEWARES (Run before Routes)
   ---------------------------
   - express.json() → Parse JSON body (e.g., { "name": "Vedant" })
   - express.urlencoded() → Parse form-data (HTML forms)
   - cookieParser() → Extract cookies (used for authentication via JWT)
   - cors() → Allow frontend (React/Vite) to talk with backend
--------------------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---------------------------
// CORS CONFIGURATION
// ---------------------------
const corsOptions = {
  origin: "http://localhost:5173", // Allow only frontend (Vite React app)
  credentials: true, // Allow cookies & auth headers
};
app.use(cors(corsOptions));

// ---------------------------
// SERVER CONFIG
// ---------------------------
const PORT = process.env.PORT || 3000;

// ---------------------------
// ROUTES (API Endpoints)
// ---------------------------
/*
   Flow of Request:
   1. User calls → http://localhost:8000/api/v1/user/register
   2. Goes to index.js → app.use("/api/v1/user", userRoute)
   3. Moves to routes/user.route.js → finds "/register" route
   4. Calls controller (user.controller.js) → where business logic runs
   5. If needed → uses middlewares (e.g., isAuthenticated.js)
*/
app.use("/api/v1/user", userRoute);

// ---------------------------
// START SERVER (After DB Connection)
// ---------------------------
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server Running at Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });
