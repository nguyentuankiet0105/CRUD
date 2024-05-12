import express from "express";
import { getUsers, getOneUser, createUser, editUser, deleteUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:userId", getOneUser);

router.post("/", createUser);

router.put("/:userId", editUser);

router.delete("/:userId", deleteUser);

export default router;
