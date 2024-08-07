import mongoose from "mongoose";
import userModel from "../Models/userModel.js";

const createUser = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;
  if (!fullname || !email || !password || !confirmPassword) {
    res.status(400).send("Send all fields");
    throw new Error("All fields are required");
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User alredy exist");
  }
  const user = await new userModel({
    fullname: fullname,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });
  await user.save();
  res.status(201).json({ success: true, data: user });
};

export { createUser };
