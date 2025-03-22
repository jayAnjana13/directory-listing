import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/get-products", getProducts);
productRouter.post("/add-product", addProduct);

export default productRouter;
