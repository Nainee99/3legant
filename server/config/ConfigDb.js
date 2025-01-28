import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// MongoDB URI from the environment variables
const mongoURI = process.env.MONGODB_URI;

// Function to connect to the database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using mongoose without deprecated options
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
