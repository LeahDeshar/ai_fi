import express from "express";

import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";

import { createEquipmentController } from "../controller/equipmentController.js";

const router = express.Router();

router.post("/create-equip", singleUpload, createEquipmentController);

export default router;
