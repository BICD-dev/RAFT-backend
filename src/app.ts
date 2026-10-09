import express from "express";
import errorHandler from "./utils/middleware/error-handler.service";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./auth/auth.route";
import courseRouter from "./course/course.route";
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter)

// Error handling middleware
app.use(errorHandler);

export default app;