import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import {
  createPlaylist,
  deleteFromUserPlaylist,
  getOneExerciseFromUserPlaylist,
  getUserPlaylist,
} from "../controller/playlist.js";

const router = express.Router();

router.post("/create", isAuth, createPlaylist);

router.get("/all", isAuth, getUserPlaylist);

router.get("/:exerciseId", isAuth, getOneExerciseFromUserPlaylist);

router.delete("/:exerciseId", isAuth, deleteFromUserPlaylist);

export default router;
