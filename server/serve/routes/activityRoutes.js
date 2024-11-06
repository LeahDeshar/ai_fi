import express from "express";
import {
  getUserActivity,
  updateUserActivity,
} from "./controllers/activityController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET user activity for a specific date
router.get("/activity/:date", isAuth, getUserActivity);

// PATCH to update user activity for a specific date
router.patch("/activity/:date", isAuth, updateUserActivity);

export default router;
