import express from "express";

import { isAuth } from "../middleware/authMiddleware.js";
import Food from "../models/FoodItem.js";
import {
  createFoodController,
  getFoodByBarCode,
  getFoodController,
} from "../controller/foodController.js";
const router = express.Router();

router.post("/create", createFoodController);

router.get("/get", getFoodController);

router.get("/barcode/:barcode", getFoodByBarCode);

export default router;
