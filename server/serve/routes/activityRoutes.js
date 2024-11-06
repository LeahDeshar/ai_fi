import express from "express";
import {
  getUserActivity,
  updateUserActivity,
  createActivityForNextDay,
} from "../controller/activityController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/activity", isAuth, getUserActivity);

router.post("/activity", isAuth, createActivityForNextDay);

router.patch("/activity/:date", isAuth, updateUserActivity);

export default router;
