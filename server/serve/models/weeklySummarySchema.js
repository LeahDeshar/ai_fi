import mongoose from "mongoose";

const weeklySummarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalWaterIntake: { type: Number, required: true },
  totalCalorieIntake: { type: Number, required: true },
  averageSleepDuration: { type: Number, required: true },
  totalDailySteps: { type: Number, required: true },
  isNotified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const WeeklySummary = mongoose.model("WeeklySummary", weeklySummarySchema);

export default WeeklySummary;
