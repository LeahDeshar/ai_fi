import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../util/features.js";
import Post from "../models/post.js";
import { multipleUpload } from "../middleware/multer.js";
const router = express.Router();

const setupPostRoutes = (io) => {
  router.post("/create", isAuth, multipleUpload, async (req, res) => {
    try {
      const userId = req.user._id;
      const { content, tags, categories } = req.body;

      console.log(categories);

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No media files uploaded." });
      }

      // Initialize array for media files metadata
      const mediaUploads = await Promise.all(
        req.files.map(async (file) => {
          const dataUri = getDataUri(file).content;

          // Determine the resource_type based on file type
          const isVideo = file.mimetype.startsWith("video/");
          const resourceType = isVideo ? "video" : "image";

          // Upload to Cloudinary with specified resource type
          const result = await cloudinary.v2.uploader.upload(dataUri, {
            resource_type: resourceType,
            folder: "posts",
          });

          return {
            public_id: result.public_id,
            url: result.secure_url,
            type: resourceType, // store as "image" or "video" in your database
          };
        })
      );

      // Create the post in MongoDB
      const post = await Post.create({
        user: userId,
        content,
        media: mediaUploads,
        tags,
        categories,
      });

      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post", error });
    }
  });

  //   get all the post of the user
  router.get("/all", isAuth, async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user._id })
        .populate("user", "name")
        .populate("tags", "name")
        .populate("likes", "name")
        .sort({ createdAt: -1 });

      res.status(200).json(posts);
    } catch (error) {
      console.error("Error getting posts:", error);
      res.status(500).json({ message: "Failed to get posts", error });
    }
  });

  //   delete the sepc post of the user
  router.delete("/delete/:id", isAuth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await post.remove();

      res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post", error });
    }
  });

  return router;
};

export default setupPostRoutes;
