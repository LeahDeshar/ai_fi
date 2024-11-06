import express from "express";
import { generateWeeklySummary } from "../controller/weeklySummaryController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/weekly-summary", isAuth, generateWeeklySummary);

export default router;
