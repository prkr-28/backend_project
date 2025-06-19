import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log(error);
    });
    app.listen(process.env.PORT, () => {
      console.log(`app is listning on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
