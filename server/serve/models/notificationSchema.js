import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: [
      "friend_request",
      "friend_accept",
      "like",
      "comment",
      "goal_reached",
      "challenge",
      "mention",
    ],
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
