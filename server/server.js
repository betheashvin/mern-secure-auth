import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Initialize DB connection
let dbConnected = false;

connectDB()
  .then(() => {
    dbConnected = true;
    console.log("DB initialization successful");
  })
  .catch((err) => {
    console.error("DB initialization failed:", err.message);
    dbConnected = false;
  });

// Health check middleware to verify DB connection
const checkDB = (req, res, next) => {
  if (!dbConnected) {
    connectDB()
      .then(() => {
        dbConnected = true;
        next();
      })
      .catch((err) => {
        console.error("DB reconnection failed:", err.message);
        res
          .status(503)
          .json({ success: false, message: "Database unavailable" });
      });
  } else {
    next();
  }
};

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://mern-auth-eight-chi.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

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
  res.json({ success: true, message: "Server is running", dbConnected }),
);
app.use("/api/auth", checkDB, authRouter);
app.use("/api/user", checkDB, userRouter);

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
