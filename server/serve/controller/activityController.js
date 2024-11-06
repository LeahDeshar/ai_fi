import UserActivity from "../models/activitySchema.js";
import FastingSchedule from "../models/FastingScheduleSchema.js";
import WeeklySummary from "../models/weeklySummarySchema.js";
import moment from "moment";
import { client } from "../util/redis.js";

const checkAndCreateActivity = async (userId) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today

  // Check if activity exists for today
  const activityExists = await UserActivity.findOne({
    userId: userId,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  // If activity doesn't exist, create a new one
  if (!activityExists) {
    // Fetch the user's current fasting settings
    const fastingSchedule = await FastingSchedule.findOne({
      user: userId,
      isActive: true,
    });

    if (!fastingSchedule) {
      throw new Error("Active fasting schedule not found for user");
    }

    const { fastingHours, eatingHours, startTime } = fastingSchedule;
    const fastingEndTime = new Date(
      startTime.getTime() + fastingHours * 60 * 60 * 1000
    );

    // Create a new activity for today with the user's current fasting settings
    const newActivity = new UserActivity({
      userId: userId,
      date: startOfDay,
      waterIntake: 0,
      calorieIntake: 0,
      sleepDuration: 0,
      dailySteps: 0,
      fastingOption: `${fastingHours}:${eatingHours}`,
      fastingStartTime: startTime,
      fastingEndTime: fastingEndTime,
      isFastingAdhered: false,
      fastingDeviation: 0,
    });

    await newActivity.save();
    console.log(`Created new activity for user ${userId} for today.`);
  } else {
    console.log(`Activity for user ${userId} already exists for today.`);
  }
};

// http://localhost:8080/api/v1/daily/activity
export const createActivityForNextDay = async (req, res) => {
  try {
    const userId = req.user._id;
    await checkAndCreateActivity(userId);

    res
      .status(200)
      .json({ message: "Activity record checked and created for today." });
  } catch (error) {
    res.status(500).json({
      message: "Error while checking and creating activity record.",
      error: error.message,
    });
  }
};

// http://localhost:8080/api/v1/daily/activity
export const getUserActivity = async (req, res) => {
  try {
    const { date } = req.body;

    console.log(date);
    const userId = req.user._id;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const activity = await UserActivity.findOne({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!activity) {
      return res
        .status(404)
        .json({ message: "Activity not found for this date." });
    }

    return res.json({ activity });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// http://localhost:8080/api/v1/daily/activity/2024-11-06
export const updateUserActivity = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const updatedActivity = await UserActivity.findOneAndUpdate(
      { userId, date: { $gte: startOfDay, $lte: endOfDay } },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedActivity) {
      return res
        .status(404)
        .json({ message: "Activity not found for this date." });
    }

    return res.json({
      message: "Activity updated successfully",
      updatedActivity,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// delete all the useractivity of the user
export const deleteAllUserActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    await UserActivity.deleteMany({ userId });
    res.status(200).json({ message: "All activities deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting activities", error });
  }
};

// get all te useractivity of the user
export const getAllUserActivity = async (req, res) => {
  try {
    const userId = req.user._id;

    const cacheKey = `user-activity:${userId}`;
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log("Data retrieved from cache");
      return res.status(200).json({ activities: JSON.parse(cachedData) });
    }

    const activities = await UserActivity.find({ userId });

    client.set(cacheKey, JSON.stringify(activities), "EX", 259200);

    res.status(200).json({ activities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting activities", error });
  }
};
