import mongoose from "mongoose";
import logger from "../utils/logger";

export function connectToDatabase(MONGO_URL: string) {
  mongoose.Promise = global.Promise;
  mongoose.connect(MONGO_URL);

  mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error:", error);
    logger.error(error);
  });

  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB successfully!");
    logger.info("Connected to MongoDB successfully!");
  });
}
