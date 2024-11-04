import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  title: {
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
  subWorkouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubWorkout",
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
