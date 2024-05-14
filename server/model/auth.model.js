import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// encrypting password before saving
authSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    next(error);
  }
});

//verify password
authSchema.methods.comparePassword = async function (payload) {
  return await bcrypt.compare(payload, this.password);
};

// get the token
authSchema.methods.jwtGennerateToken = async function () {
  return jwt.sign({ username: this.username }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

const auth = mongoose.model("auth", authSchema);

export { auth };
