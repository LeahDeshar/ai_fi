import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    reactions: {
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
      dislikes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
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

export const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
