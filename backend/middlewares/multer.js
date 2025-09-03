import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({storage}).single("file");

// For profile + resume uploads
export const multiUpload = multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

