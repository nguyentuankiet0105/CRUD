import { auth } from "../model/auth.model.js";

const register = async (req, res, next) => {
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

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const account = await auth.findOne({ username });
    if (!account) {
      return res.status(400).json({ message: "Account does not exist" });
    }
    const isMatched = await account.comparePassword(password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid password" });
    }
    gennerateToken(account, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const gennerateToken = async (account, statusCode, res) => {
  const token = await account.jwtGennerateToken();
  const options = {
    expires: new Date(Date.now() + parseInt(process.env.EXPIRE_TOKEN)),
  };
  res.status(statusCode).cookie("access_token", token, options).json({
    success: true,
    token,
  });
};

export { register, login };
