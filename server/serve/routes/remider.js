import express from "express";

import { isAuth } from "../middleware/authMiddleware.js";
import {
  createReminder,
  getUsersReminder,
} from "../controller/reminderController.js";

const router = express.Router();
// Create or Update Reminder
router.post("/create", isAuth, createReminder);

// Get Reminder Setting
router.get("/get", isAuth, getUsersReminder);

// Update Reminder
// router.put("/reminder/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const updates = req.body;

//   try {
//     const reminder = await updateReminderSetting(userId, updates);
//     res.status(200).json(reminder);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Delete Reminder
// router.delete("/reminder/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     await deleteReminderSetting(userId);
//     res.status(200).json({ message: "Reminder setting deleted." });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

export default router;
