import express from "express";

import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";
import {
  createWorkoutController,
  deleteWorkoutController,
  getWorkoutByIdController,
  getWorkoutController,
  updateWorkoutController,
} from "../controller/workoutController.js";

const router = express.Router();

router.post("/create-workout", singleUpload, createWorkoutController);

router.get("/get-workout", getWorkoutController);

router.get("/get-workout/:id", getWorkoutByIdController);

router.patch("/update-workout/:id", updateWorkoutController);

router.delete("/delete-workout/:id", deleteWorkoutController);

export default router;
