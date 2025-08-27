import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);        //connect mongodb connection string inside .env file 
    console.log("MongoDB connected Successfully.")
  } catch (error) {
    console.log(error);
  }
}


export default connectDB;