import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
      require: [true, "Please enter User ID"],
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      require: [true, "Please enter Username"],
    },
    phone: {
      type: String,
      trim: true,
      require: [true, "Please enter phone number"],
    },
    role: {
      type: String,
      trim: true,
      require: [true, "Please enter choose role"],
      default: "Admin",
    },
    image: {
      type: String,
      trim: true,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export { User };
