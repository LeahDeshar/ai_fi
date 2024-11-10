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

    console.log(post, content, parentComment);
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

  //   getCommentsByPost
  router.get("/get", isAuth, async (req, res) => {
    try {
      const { postId } = req.query;

      console.log("postId", postId);

      const comments = await Comment.find({ post: postId, parentComment: null })
        .populate({
          path: "user",
          select: "profile",
          populate: {
            path: "profile",
            select: "name profilePic",
          },
        })
        .populate({
          path: "replies",
          populate: {
            path: "user",
            populate: {
              path: "profile",
              select: "name profilePic",
            },
          },
        })
        .sort({ createdAt: -1 });

      io.emit("commentsForPost", { postId, comments });

      console.log(comments);
      res.status(200).json(comments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      res.status(500).json({ message: "Failed to fetch comments", error });
    }
  });

  //   router.post("/reply", isAuth, async (req, res) => {
  //     try {
  //       const userId = req.user._id;
  //       const { postId, content, parentCommentId } = req.body;

  //       const reply = new Comment({
  //         post: postId,
  //         user: userId,
  //         content,
  //         parentComment: parentCommentId,
  //       });

  //       await reply.save();

  //       res.status(201).json(reply);
  //     } catch (error) {
  //       res.status(500).json({ message: "Failed to add reply", error });
  //     }
  //   });

  router.post("/reply", isAuth, async (req, res) => {
    try {
      const userId = req.user._id;
      const { postId, content, parentCommentId } = req.body;

      // Create a new reply comment
      const reply = new Comment({
        post: postId,
        user: userId,
        content,
        parentComment: parentCommentId, // Set the parent comment
      });

      // Save the reply
      await reply.save();

      // Now update the parent comment with this reply by pushing the reply to the 'replies' array
      const parentComment = await Comment.findById(parentCommentId);

      if (parentComment) {
        parentComment.replies.push(reply._id); // Add the reply to the parent comment's 'replies' field
        await parentComment.save(); // Save the updated parent comment
      }

      res.status(201).json(reply); // Send back the reply
    } catch (error) {
      console.error("Error adding reply:", error);
      res.status(500).json({ message: "Failed to add reply", error });
    }
  });

  return router;
};
export default setupCommentRoutes;
