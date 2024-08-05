import express from "express";

const app = express();
const router = =app.Router();

const port = 5555;

router.get("/", (req, res) => {
  console.log(`server started on port ${port}`);
});
