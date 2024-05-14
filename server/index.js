import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
