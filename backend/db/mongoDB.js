import mongoose from "mongoose";

const mongodbURI = process.env.mongoURI;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURI);
    console.log("database connected successfuly 😎");
  } catch (error) {
    await mongoose.disconnect();
    throw new Error("connection error while connecting to database 😞");
  }
};
