import express from "express";
import {
  addMaterial,
  getMaterials,
} from "../controllers/materialController.js";

const materialRouter = express.Router();

materialRouter.get("/get-materials", getMaterials);
materialRouter.post("/add-material", addMaterial);

export default materialRouter;
