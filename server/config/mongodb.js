import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Skip connection if already connected
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    mongoose.connection.on("connected", () =>
      console.log("Database Connected"),
    );
    mongoose.connection.on("error", (err) =>
      console.error("Database error:", err),
    );

    await mongoose.connect(process.env.MONGODB_URL, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 60000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: "majority",
    });
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    throw error;
  }
};

export default connectDB;
