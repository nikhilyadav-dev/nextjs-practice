import mongoose from "mongoose";
const DB_URL = "mongodb://127.0.0.1:27017/todo";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Database is already connected");
      return;
    }
    await mongoose.connect(DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
