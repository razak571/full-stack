import { createUser } from "../Controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/", createUser);

export default userRouter;
