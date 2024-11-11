import express from "express";

import { isAuth } from "../middleware/authMiddleware.js";
import { getUserActivityInsights } from "../controller/activityInsights.js";

const router = express.Router();

router.get("/get-insight", isAuth, getUserActivityInsights);

export default router;
