import { testController } from "../Controllers/testController.js";
import express from "express";

const testRouter = express.Router();

testRouter.post("/:userId", testController);

export default testRouter;
