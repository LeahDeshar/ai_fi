import mongoose from "mongoose";
import WeeklySummary from "./models/WeeklySummary";
import Activity from "./models/Activity"; // Assuming you have an Activity model for daily logs

const generateWeeklySummaries = async () => {
  const users = await mongoose.model("User").find({}); // Get all users

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7); // Start of the weekly summary
  const endDate = new Date(); // End date is today

  for (const user of users) {
    const activities = await Activity.find({
      userId: user._id,
      date: { $gte: startDate, $lt: endDate },
    });

    // Aggregate weekly data
    const totalWaterIntake = activities.reduce(
      (sum, activity) => sum + activity.waterIntake,
      0
    );
    const totalCalorieIntake = activities.reduce(
      (sum, activity) => sum + activity.calorieIntake,
      0
    );
    const averageSleepDuration =
      activities.reduce((sum, activity) => sum + activity.sleepDuration, 0) /
      activities.length;
    const totalDailySteps = activities.reduce(
      (sum, activity) => sum + activity.dailySteps,
      0
    );

    // Create or update weekly summary
    await WeeklySummary.findOneAndUpdate(
      { userId: user._id, startDate, endDate },
      {
        userId: user._id,
        startDate,
        endDate,
        totalWaterIntake,
        totalCalorieIntake,
        averageSleepDuration,
        totalDailySteps,
      },
      { upsert: true, new: true }
    );
  }
};
