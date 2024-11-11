import UserActivity from "../models/activitySchema.js";
import FastingSchedule from "../models/FastingScheduleSchema.js";
import WeeklySummary from "../models/weeklySummarySchema.js";

export const getUserActivityInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch today's activity
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day
    const dailyActivity = await UserActivity.findOne({
      userId,
      date: today,
    });

    // Fetch the current week's summary
    const weeklySummary = await WeeklySummary.findOne({
      userId,
      startDate: { $lte: today },
      endDate: { $gte: today },
    });

    // Fetch the active fasting schedule
    const fastingSchedule = await FastingSchedule.findOne({
      user: userId,
      isActive: true,
    });

    // Create insights
    const insights = {
      dailySteps: dailyActivity?.dailySteps || 0,
      calorieIntake: dailyActivity?.calorieIntake || 0,
      waterIntake: dailyActivity?.waterIntake || 0,
      sleepDuration: dailyActivity?.sleepDuration || 0,
      fastingAdherence: dailyActivity?.isFastingAdhered || false,
      fastingDeviation: dailyActivity?.fastingDeviation || 0,
      weeklySummary: weeklySummary || {},
      fastingSchedule: fastingSchedule || {},
    };

    return res.status(200).json({ data: insights });
  } catch (error) {
    console.error("Error fetching user activity insights:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch user activity insights." });
  }
};
