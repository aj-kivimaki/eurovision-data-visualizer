import mongoose from "mongoose";
import logger from "../utils/logger";

export function connectToDatabase(MONGO_URL: string) {
  mongoose.Promise = global.Promise; // Use the global promise library
  mongoose.connect(MONGO_URL); // Connect to MongoDB

  mongoose.connection.on("error", (error) => {
    // Log an error if we fail to connect to MongoDB
    console.log("MongoDB connection error:", error);
    logger.error(error);
  });

  mongoose.connection.once("open", () => {
    // Log a message when we successfully connect to MongoDB
    console.log("Connected to MongoDB successfully!");
    logger.info("Connected to MongoDB successfully!");
  });
}
