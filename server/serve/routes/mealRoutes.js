import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import {
  createMeal,
  deleteMeal,
  getAllMeals,
  getDailyConsumption,
  getMealById,
  getMealsByDate,
  getMealsByMealType,
  updateMeal,
} from "../controller/mealController.js";

const router = express.Router();

router.post("/create", isAuth, createMeal);
router.get("/get", isAuth, getAllMeals);
router.get("/daily", isAuth, getDailyConsumption);

router.get("/get/:mealType", isAuth, getMealsByMealType);

router.get("/get/date/:date", isAuth, getMealsByDate);

router.get("/get/:id", getMealById);
router.patch("/update/:id", updateMeal); // Patch for updating
router.delete("/delete/:id", deleteMeal);

export default router;
