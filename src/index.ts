import app from "./app";
import dotenv from "dotenv";
import { databaseService } from "./utils/database";
import "reflect-metadata";

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  await databaseService.connect();

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  let isShuttingDown = false;
  const gracefulShutdown = () => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log("Shutting down gracefully...");
    server.close(async () => {
      await databaseService.disconnect();
      console.log("Server closed.");
      process.exit(0);
    });
  };

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
};

//  this is so that my server doesnt just crash without telling me anything, sha... im logging the error and exiting the process with a non-zero exit code to indicate failure.
start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});