// utils/datauri.js
import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

const getDataUri = (file) => {
  return parser.format(
    path.extname(file.originalname).toString(), // ".pdf"
    file.buffer
  );
};

export default getDataUri;
