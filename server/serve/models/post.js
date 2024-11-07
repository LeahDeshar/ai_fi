import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    media: [
      {
        url: { type: String, required: true }, // URL to the media file (image, video, etc.)
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
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const Post = mongoose.model("Post", postSchema);

export default Post;
