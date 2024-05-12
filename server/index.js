import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRoute);

mongoose
  .connect(
    "mongodb+srv://kietnt:kietnt010599@kietnt.zcclaom.mongodb.net/?retryWrites=true&w=majority&appName=kietnt"
  )
  .then(() => {
    console.log("connected to MongoDB...");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("connection failed!", err);
  });
