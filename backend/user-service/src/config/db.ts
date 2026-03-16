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
    if (error instanceof Error) {
      logger.error(`Databse: Failed to connect : ${error.message}`);
    } else logger.error(`Database: Failed to connect : Unknown error`);
    process.exit(1);
  }
};

export default connectDb;
