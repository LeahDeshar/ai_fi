import express from "express";

import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";

import { createWorkSessionController } from "../controller/exerciseController.js";

const router = express.Router();

router.post("/create-exercise", singleUpload, createWorkSessionController);

export default router;
