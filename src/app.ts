import express from "express";
import path from "path";
import errorHandler from "./utils/middleware/error-handler.service";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./auth/auth.route";
import courseRouter from "./course/course.route";
import classRouter from "./class/class.route";
import studentRouter from "./student/student.route";
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter)
app.use("/api/classes", classRouter);
app.use("/api/students", studentRouter);

// Error handling middleware
app.use(errorHandler);

export default app;