import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
