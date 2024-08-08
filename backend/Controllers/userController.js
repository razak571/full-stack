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

const loginUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    res.status(400).send("All filds are required");
    throw new Error("Missing Fields");
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      data: {
        _id: existingUser._id,
        fullname: existingUser.fullname,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res.send(error);
  }
};
export { createUser, loginUser };
