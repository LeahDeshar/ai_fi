import express from "express";

import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";
import {
  getCalorieRecomController,
  getDietRecomController,
  getExerciseRecomController,
  getSleepRecomController,
  test,
} from "../controller/recommendation.js";

const router = express.Router();

router.get("/predict-fitness", getExerciseRecomController);
router.get("/predict-sleep", getSleepRecomController);
router.get("/predict-calorie", getCalorieRecomController);
router.get("/predict-diet", getDietRecomController);

export default router;
