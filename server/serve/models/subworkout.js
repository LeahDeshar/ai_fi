import mongoose from "mongoose";
const subWorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  calorieBurn: {
    type: String,
    required: true,
  },
  focusZones: {
    type: String,
    required: true,
  },
  workSession: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
  ],
  equipment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
  ],
});

const SubWorkout = mongoose.model("SubWorkout", subWorkoutSchema);

export default SubWorkout;
