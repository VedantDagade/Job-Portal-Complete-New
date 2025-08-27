// ========== MIDDLEWARES/isAuthenticated.js ==========
import jwt from "jsonwebtoken";

//* Middleware to check if user is authenticated
// Middleware always has (req, res, next)
// - req → incoming request
// - res → response
// - next → pass control to next function
const isAuthenticated = async (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // 2. Verify token using secret key
    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // 3. Store userId inside request (so controller can use it)
    req.id = decode.userId;

    // 4. Pass control to next middleware/controller
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
