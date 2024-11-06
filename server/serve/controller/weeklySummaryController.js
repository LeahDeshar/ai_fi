import WeeklySummary from "../models/weeklySummarySchema.js";

import UserActivity from "../models/activitySchema.js";
import User from "../models/user.js";

const createWeeklySummary = async (userId) => {
  try {
    // Define the date range for the past week
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    // Fetch daily activities within the past week
    const activities = await UserActivity.find({
      userId,
      date: { $gte: startDate, $lt: endDate },
    });

    // Calculate totals and averages
    const totalWaterIntake = activities.reduce(
      (sum, activity) => sum + activity.waterIntake,
      0
    );
    const totalCalorieIntake = activities.reduce(
      (sum, activity) => sum + activity.calorieIntake,
      0
    );
    const totalDailySteps = activities.reduce(
      (sum, activity) => sum + activity.dailySteps,
      0
    );
    const averageSleepDuration =
      activities.reduce((sum, activity) => sum + activity.sleepDuration, 0) /
      activities.length;

    // Create and save the weekly summary
    const weeklySummary = new WeeklySummary({
      userId,
      startDate,
      endDate,
      totalWaterIntake,
      totalCalorieIntake,
      averageSleepDuration,
      totalDailySteps,
    });

    await weeklySummary.save();
    console.log(`Weekly summary created for user ${userId}`);
    return weeklySummary;
  } catch (error) {
    console.error("Error creating weekly summary:", error);
    throw error;
  }
};

//POST http://localhost:8080/api/v1/weekly/weekly-summary
export const generateWeeklySummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create weekly summary for the user
    const summary = await createWeeklySummary(userId);
    res.status(201).json({ message: "Weekly summary created", summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating weekly summary" });
  }
};
