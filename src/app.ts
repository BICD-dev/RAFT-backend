import express from "express";
import errorHandler from "./utils/middleware/error-handler.service";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./auth/auth.route";
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;