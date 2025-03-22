import express from "express";
import { getGrades, addGrade } from "../controllers/gradeController.js";

const gradeRouter = express.Router();

gradeRouter.get("/get-grades", getGrades);
gradeRouter.post("/add-grade", addGrade);

export default gradeRouter;
