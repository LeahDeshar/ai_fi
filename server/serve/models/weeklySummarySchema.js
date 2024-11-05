const mongoose = require("mongoose");

const weeklySummarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalWaterIntake: { type: Number, required: true }, // in liters
  totalCalorieIntake: { type: Number, required: true }, // in calories
  averageSleepDuration: { type: Number, required: true }, // in hours
  totalDailySteps: { type: Number, required: true }, // total steps in the week
  isNotified: { type: Boolean, default: false }, // flag to check if the user has been notified
  createdAt: { type: Date, default: Date.now },
});

const UserWeeklySummary = mongoose.model(
  "UserWeeklySummary",
  weeklySummarySchema
);

module.exports = UserWeeklySummary;
