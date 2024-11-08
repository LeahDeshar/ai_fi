import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    media: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        type: {
          type: String,
          enum: ["image", "video", "audio", "other"],
          default: "image",
        },
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    categories: [
      {
        type: String,
        enum: ["workout", "nutrition", "motivation", "general"],
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);

export default Post;
