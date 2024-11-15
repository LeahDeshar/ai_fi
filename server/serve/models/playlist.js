import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    exercises: [
      {
        bodyPart: { type: String, required: true },
        equipment: { type: String, required: true },
        estimatedCaloriesBurned: { type: Number, required: true },
        instructions: { type: String, required: true }, // store the instructions as a string
        name: { type: String, required: true },
        target: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
