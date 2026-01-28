import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://mern-auth-eight-chi.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Middleware for DB connection on each request
const ensureDBConnection = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB connection error:", error);
    res.status(503).json({ success: false, message: "Database unavailable" });
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => res.send("API working"));
app.get("/api/health", (req, res) =>
  res.json({ success: true, message: "Server is running" }),
);

// Apply DB middleware to routes that need it
app.use("/api/auth", ensureDBConnection, authRouter);
app.use("/api/user", ensureDBConnection, userRouter);

// Catch 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(500)
    .json({ success: false, message: err.message || "Internal server error" });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`Server started on port ${port}`));
}
export default app;
