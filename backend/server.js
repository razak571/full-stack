import dotenv from "dotenv";
import abc from "express";

dotenv.config();

const PORT = process.env.PORT;

const app = abc();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
