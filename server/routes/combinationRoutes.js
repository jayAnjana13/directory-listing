import express from "express";
import {
  getCombination,
  addCombination,
  updateCombination,
} from "../controllers/combinationController.js";

const combinationRouter = express.Router();

combinationRouter.get("/get-combination", getCombination);
combinationRouter.post("/add-combination", addCombination);
combinationRouter.put("/update-combination/:id", updateCombination);

export default combinationRouter;
