import mongoose from "mongoose";

const SetSchema = new mongoose.Schema({
  setNumber: { type: Number, required: true },
  repetitions: { type: Number },
});

const ExerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: {
    public_id: { type: String },
    url: { type: String },
  },
  video: {
    public_id: { type: String },
    url: { type: String },
  },
  duration: { type: Number, required: true },
  desc: { type: String, required: true },
  howTo: { type: [String], required: true },
  commonMistake: { type: [String], required: true },
  tips: { type: [String], required: true },
  workType: {
    type: String,
    enum: ["warmUp", "workoutSet", "coolDown"],
    required: true,
  },
  // Add sets only for workout sessions
  sets: {
    type: [SetSchema],
    required: function () {
      return this.workType === "workoutSet";
    },
  },
});

export const Exercise = mongoose.model("Exercise", ExerciseSchema);
export default Exercise;
