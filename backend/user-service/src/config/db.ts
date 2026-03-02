import mongoose from "mongoose";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    const uri = process.env.DB_URI;
    if (!uri) {
      throw new Error("Invalid uri");
    }
    await mongoose.connect(uri, {
      dbName: `${process.env.PROJECT}-${process.env.SERVICE}`,
    });

    logger.info(`Database: Successfully connected.`);
  } catch (error) {
    logger.error(`Database: Failed to connect: ${error}`);
    process.exit(1);
  }
};

export default connectDb;
