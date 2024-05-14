import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);


const port = process.env.PORT;
const DatabaseURL = process.env.DATABASE_CONNECT;

mongoose
  .connect(DatabaseURL)
  .then(() => {
    console.log("connected to MongoDB...");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("connection failed!", err);
  });
