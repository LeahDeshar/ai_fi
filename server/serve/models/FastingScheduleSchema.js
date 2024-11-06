import mongoose from "mongoose";

const FastingScheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  fastingHours: { type: Number, required: true, default: 16 },
  eatingHours: { type: Number, required: true, default: 8 },
  startTime: { type: Date, required: true, default: Date.now },
  endTime: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});
const FastingSchedule = mongoose.model(
  "FastingSchedule",
  FastingScheduleSchema
);
export default FastingSchedule;
