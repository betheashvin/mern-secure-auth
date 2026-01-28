import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB
connectDB().catch(err => console.error("Database connection error:", err));

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
app.get("/api/health", (req, res) => res.json({ success: true, message: "Server is running" }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ success: false, message: err.message });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`Server started on port ${port}`));
}
export default app;
