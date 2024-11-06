import express from "express";
import {
  chooseFastingSchController,
  getUserSchedule,
  updateUserSchedule,
} from "../controller/fastingScheduleController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/choose", isAuth, chooseFastingSchController);
router.get("/get-schedule", getUserSchedule);
router.patch("/update-schedule/:id", isAuth, updateUserSchedule);

export default router;
