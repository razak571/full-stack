import { testController } from "../Controllers/testController.js";
import express from "express";

const testRouter = express.Router();

testRouter.get("/:userId", testController);

export default testRouter;
