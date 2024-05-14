import { auth } from "../model/auth.model.js";

const signup = async (req, res, next) => {
  const { email } = req.body;
  const accountExists = await auth.findOne({ email });
  if (accountExists) {
    return res.status(400).json({ message: "Email already exists" });
  }
  try {
    const account = await auth.create(req.body);
    res.status(200).json({
      success: true,
      account,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res) => {
  res.send("login");
};
export { signup, signin };
