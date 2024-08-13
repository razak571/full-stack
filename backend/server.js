import "dotenv/config";
import express from "express";
import { connectDB } from "./db/mongoDB.js";
import userRouter from "./Routes/userRoute.js";
import cors from "cors";

const PORT = process.env.PORT;
const frontEndUrl = process.env.FRONTEND_URI;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: frontEndUrl,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from server...");
});

app.use("/api/v1/user", userRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started on port ${PORT}`);
});
