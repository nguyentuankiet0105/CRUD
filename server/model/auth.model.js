import mongoose from "mongoose";

const authSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      require: [true, "Please enter Username"],
    },
    email: {
      type: String,
      trim: true,
      require: [true, "Please enter email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      require: [true, "Please enter password"],
      minlength: [6, "Password must have at least six(6) characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must have at least one uppercase, one lowercase, one number and one special character",
      ],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const auth = mongoose.model("auth", authSchema);

export { auth };
