const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  waterIntake: { type: Number, required: true }, // in liters
  calorieIntake: { type: Number, required: true }, // in calories
  sleepDuration: { type: Number, required: true }, // in hours
  dailySteps: { type: Number, required: true }, // number of steps
  createdAt: { type: Date, default: Date.now },
});

const UserActivity = mongoose.model("UserActivity", activitySchema);

module.exports = UserActivity;
