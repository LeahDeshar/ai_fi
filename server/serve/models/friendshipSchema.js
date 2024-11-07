import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "blocked", "rejected"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    acceptedAt: {
      type: Date,
    },

    blockedAt: {
      type: Date,
    },
    isMutual: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Friendship = mongoose.model("Friendship", friendshipSchema);

export default Friendship;
