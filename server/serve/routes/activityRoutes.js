import express from "express";
import {
  getUserActivity,
  updateUserActivity,
  createActivityForNextDay,
  deleteAllUserActivity,
  getAllUserActivity,
} from "../controller/activityController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/activity", isAuth, getUserActivity);

router.get("/activity/all", isAuth, getAllUserActivity);

router.post("/activity", isAuth, createActivityForNextDay);

router.delete("/activity", isAuth, deleteAllUserActivity);

router.patch("/activity/:date", isAuth, updateUserActivity);

export default router;
