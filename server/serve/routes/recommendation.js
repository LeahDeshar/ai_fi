import express from "express";

import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";
import {
  fetchYtData,
  getCalorieRecomController,
  getDietRecomController,
  getExerciseRecomController,
  getSleepRecomController,
  getYtChannelRecomController,
  test,
} from "../controller/recommendation.js";

const router = express.Router();

router.get("/predict-fitness", isAuth, getExerciseRecomController);

router.get("/predict-sleep", getSleepRecomController);
router.get("/predict-calorie", getCalorieRecomController);
router.get("/predict-diet", getDietRecomController);

router.post("/get-channel", getYtChannelRecomController);
router.get("/get-yt", fetchYtData);
export default router;
