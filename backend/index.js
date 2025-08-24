import express from "express"; // framework for server & APIs
import cookieParser from "cookie-parser"; // read cookies (auth/session)
import cors from "cors"; // allow frontend & backend to talk
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config({});

const app = express();

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I am comming from backend",
    success: true,
  });
});

//* Middleware
app.use(express.json()); // parse JSON data
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(cookieParser()); // enable cookie usage
const corsOptions = {
  origin: "http://localhost:5173", // React frontend
  credentials: true, // allow cookies/auth headers
};
app.use(cors(corsOptions));

//* Create server at port 3000
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running at Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
