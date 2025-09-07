import { Company } from "../models/company.models.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// ===================== Register a New Company =====================
export const registerCompany = async (req, res) => {
  try {
    // Extract companyName from request body (sent from Postman or frontend)
    const { companyName } = req.body;

    // Validation: Check if name is provided
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is Required.",
        success: false,
      });
    }

    // Check if company with the same name already exists in DB
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't Register Same Company.",
        success: false,
      });
    }

    // Create new company in MongoDB, with logged-in userId as owner
    company = await Company.create({
      name: companyName,
      userId: req.id, // req.id is set by middleware (decoded JWT)
    });

    // Respond back with success message
    return res.status(200).json({
      message: "Company Registerd Successfully.",
      company,
      success: true,
    });
  } catch (error) {
    // Catch server/database errors
    console.log(error);
  }
};

// ===================== Get All Companies of a User =====================
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged-in user's ID from middleware (JWT)

    // Fetch all companies created by this user
    const companies = await Company.find({ userId });

    // If user hasn’t registered any company yet
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    // Success → send list of companies
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// ===================== Get a Single Company by ID =====================
export const getCompanyById = async (req, res) => {
  try {
    // Extract companyId from URL params (/api/v1/company/:id)
    const companyId = req.params.id;

    // Fetch company details from DB
    const company = await Company.findById(companyId);

    // If no company found with this ID
    if (!company) {
      return res.status(404).json({
        message: "Company not Found",
        success: false,
      });
    }

    // Success → send the company data
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// ===================== Update Company Information =====================
export const updateCompany = async (req, res) => {
  try {
    // Extract data from request body
    const { name, description, website, location } = req.body;
    const file = req.file; // If image/logo is uploaded (via multer)

    // 🚀 Future Step: Upload file to Cloudinary (logo, banner, etc.)

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    // Prepare update object
    const updateData = { name, description, website, location, logo };

    // Update the company in DB and return new data
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // ensures updated data is returned
    });

    // If no company found with this ID
    if (!company) {
      return res.status(400).json({
        message: "Company not Found",
        success: false,
      });
    }

    // Success response
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
      company, // you can also return updated company
    });
  } catch (error) {
    console.log(error);
  }
};
