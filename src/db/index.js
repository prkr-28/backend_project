import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log(`mongodb connected ${connctionIndtance.connecion.host}`);
  } catch (error) {
    console.log("database connections failed", error);
    process.exit(1);
  }
};
export default connectDB;
