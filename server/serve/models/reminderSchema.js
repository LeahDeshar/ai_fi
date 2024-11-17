import mongoose from "mongoose";

const MealReminderSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: false },
  time: { type: Date, required: false },
});

const ReminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    allowReminders: { type: Boolean, default: true }, // Global toggle
    exerciseReminder: {
      enabled: { type: Boolean, default: false },
      time: { type: Date, required: false }, // Optional: Time for exercise reminders
    },
    fastingReminder: {
      enabled: { type: Boolean, default: false },
      time: { type: Date, required: false }, // Optional: Time for fasting reminders
    },
    mealReminders: {
      breakfast: { type: MealReminderSchema, default: () => ({}) },
      lunch: { type: MealReminderSchema, default: () => ({}) },
      dinner: { type: MealReminderSchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

const Reminder = mongoose.model("Reminder", ReminderSchema);
export default Reminder;
