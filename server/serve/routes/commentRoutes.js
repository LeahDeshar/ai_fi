import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../util/features.js";
import Post from "../models/post.js";
import { multipleUpload } from "../middleware/multer.js";
import Comment from "../models/comment.js";
const router = express.Router();

const setupCommentRoutes = (io) => {
  router.post("/add", isAuth, async (req, res) => {
    const { post, content, parentComment } = req.body;
    try {
      const newComment = new Comment({
        post,
        user: req.user._id,
        content,
        parentComment,
      });

      await newComment.save();

      const populatedComment = await newComment.populate("user", "profile");
      console.log(populatedComment);

      io.emit("newComment", populatedComment);

      res.status(201).json(populatedComment);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Failed to add comment" });
    }
  });

  // Like or dislike a comment
  router.post("/:commentId/react", isAuth, async (req, res) => {
    const { commentId } = req.params;
    const { reaction } = req.body;
    try {
      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      if (reaction === "like") {
        if (!comment.reactions.likes.includes(req.user._id)) {
          comment.reactions.likes.push(req.user._id);
          comment.reactions.dislikes.pull(req.user._id);
        }
      } else if (reaction === "dislike") {
        if (!comment.reactions.dislikes.includes(req.user._id)) {
          comment.reactions.dislikes.push(req.user._id);
          comment.reactions.likes.pull(req.user._id);
        }
      }

      await comment.save();

      io.emit("updateCommentReaction", {
        commentId,
        reactions: comment.reactions,
      });

      res.json(comment);
    } catch (error) {
      console.error("Error updating comment reaction:", error);
      res.status(500).json({ error: "Failed to update reaction" });
    }
  });

  return router;
};
export default setupCommentRoutes;
