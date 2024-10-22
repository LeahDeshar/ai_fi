import express from "express";

import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";
import {
  getExerciseRecomController,
  test,
} from "../controller/recommendation.js";

const router = express.Router();

router.get("/predict-fitness", getExerciseRecomController);

router.get("/test", async (req, res) => {
  res.json({ message: "Test successful" });
});

export default router;
