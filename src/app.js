import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//routes...

import userRouter from "./routes/user.routes.js";

//rotes declaration...
app.use("/api/v1/users", userRouter);

export { app };
