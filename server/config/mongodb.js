import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Skip connection if already connected
    if (mongoose.connection.readyState >= 1) {
      console.log("Database already connected");
      return;
    }

    mongoose.connection.on("connected", () =>
      console.log("Database Connected"),
    );
    mongoose.connection.on("error", (err) =>
      console.error("Database error:", err),
    );

    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    throw error;
  }
};

export default connectDB;
