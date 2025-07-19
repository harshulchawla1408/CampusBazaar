import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import logger from './config/logger.js';

// Route imports
import userRoutes from "./routes/userRoutes.js"; 

// Load .env variables silently
process.env.DOTENV_CONFIG_SILENT = 'true';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => logger.info("✅ MongoDB connected"))
  .catch((err) => {
    logger.error("❌ MongoDB connection error: %s", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/v1/users", userRoutes); 

// Start Server
app.listen(PORT, () => {
  logger.info(`🌐 Server is running on http://localhost:${PORT}`);
});
