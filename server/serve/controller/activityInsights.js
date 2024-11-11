import UserActivity from "../models/activitySchema";
import FastingSchedule from "../models/FastingScheduleSchema";
import WeeklySummary from "../models/weeklySummarySchema";

export const getUserActivityInsights = async (req, res) => {
  try {
    const userId = req.user._id;
    const dailyActivity = await UserActivity.findOne({
      userId,
      date: new Date().toISOString().split("T")[0],
    });

    const weeklySummary = await WeeklySummary.findOne({
      userId,
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
    });

    // Fetch the user's fasting schedule
    const fastingSchedule = await FastingSchedule.findOne({
      user: userId,
      isActive: true,
    });

    // Create insights
    const insights = {
      dailySteps: dailyActivity?.dailySteps || 0,

      caloriesConsumed: dailyActivity?.caloriesConsumed || 0,
      waterIntake: dailyActivity?.waterIntake || 0,
      sleepDuration: dailyActivity?.sleepDuration || 0,
      fastingAdherence: dailyActivity?.isFastingAdhered || false,
      fastingDeviation: dailyActivity?.fastingDeviation || 0,
      weeklySummary: weeklySummary || {},
      fastingSchedule: fastingSchedule || {},
    };

    return insights;
  } catch (error) {
    console.error(error);
    return null;
  }
};
