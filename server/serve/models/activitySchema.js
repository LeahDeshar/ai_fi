import mongoose from "mongoose";
// daily activity tracking

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  date: { type: Date, required: true },
  waterIntake: { type: Number, required: true },
  calorieIntake: { type: Number, required: true },
  sleepDuration: { type: Number, required: true },
  dailySteps: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },

  fastingOption: { type: String, required: true },
  fastingStartTime: { type: Date, required: true },
  fastingEndTime: { type: Date, required: true },
  isFastingAdhered: { type: Boolean, default: false },
  fastingDeviation: {
    type: Number,
    default: 0,
    description: "Deviation in hours from fasting schedule",
  },
});

const UserActivity = mongoose.model("UserActivity", activitySchema);

export default UserActivity;
