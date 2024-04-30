import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGODB_URL = process.env.MONGODB_URL;
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to database successfully! 🚀");
  } catch (err) {
    console.error(err);
  }
};
