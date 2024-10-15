import express from "express";

import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";

import { createSubWorkoutController } from "../controller/subWorkoutController.js";

const router = express.Router();

router.post("/create-subout", singleUpload, createSubWorkoutController);

export default router;
