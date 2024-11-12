import express from "express";
import {
  getUserActivity,
  updateUserActivity,
  createActivityForNextDay,
  deleteAllUserActivity,
  getAllUserActivity,
  checkAndCreateActivity,
  getUserActivityThisWeek,
} from "../controller/activityController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/activity", isAuth, getUserActivity);

router.get("/week", isAuth, getUserActivityThisWeek);

router.get("/activity/all", isAuth, getAllUserActivity);

// router.get("/activity/init", isAuth, checkAndCreateActivity);

router.post("/activity", isAuth, createActivityForNextDay);

router.delete("/activity", isAuth, deleteAllUserActivity);

router.patch("/activity", isAuth, updateUserActivity);

export default router;
