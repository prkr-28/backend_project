import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `Mongodb connection successfull ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("database connections failed", error);
    process.exit(1);
  }
};
export default connectDB;
