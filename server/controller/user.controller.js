import { User } from "../model/user.model.js";

const getUsers = async (req, res) => {
  const page = req.query._page ?? 0;
  const rowPerPage = req.query._limit || 5;
  try {
    const users = {
      userList: await User.find({})
        .skip(page * rowPerPage)
        .limit(rowPerPage),
      total: await User.countDocuments(),
    };
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.statusMessage(400).json({ message: "User already exists" });
    }
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.updateOne({ userId }, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const userUpdate = await User.findOne({ userId });
      res.status(200).json(userUpdate);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const userDelete = await User.deleteOne({ userId });
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  getUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser
};
