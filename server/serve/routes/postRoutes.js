import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../util/features.js";
import Post from "../models/post.js";
import { multipleUpload, singleUpload } from "../middleware/multer.js";
const router = express.Router();

const setupPostRoutes = (io) => {
  router.post("/create", isAuth, multipleUpload, async (req, res) => {
    try {
      const userId = req.user._id;
      const { content, tags, categories } = req.body;
      console.log(req.files);

      if (!req.files) {
        return res.status(400).json({ message: "No media files uploaded." });
      }

      // Process media files, uploading each to Cloudinary
      //   const mediaUploads = await Promise.all(
      //     req.files.map(async (file) => {
      //       const dataUri = getDataUri(file).content;
      //       const result = await cloudinary.uploader.upload(dataUri, {
      //         resource_type: "auto", // Automatically handle image or video
      //         folder: "posts",
      //       });

      //       return {
      //         public_id: result.public_id,
      //         url: result.secure_url,
      //         type: result.resource_type,
      //       };
      //     })
      //   );

      //   for (const file of mediaFiles) {
      //     const uploadResponse = await cloudinary.uploader.upload(file.path, {
      //       resource_type: "auto",
      //     });
      //     uploadedMedia.push({
      //       public_id: uploadResponse.public_id,
      //       url: uploadResponse.secure_url,
      //       type: uploadResponse.resource_type,
      //     });
      //   }

      // Create and save the new post
      //   const newPost = new Post({
      //     user: userId,
      //     content,
      //     media: uploadedMedia,
      //     tags,
      //     categories,
      //   });

      //   const savedPost = await newPost.save();

      //   io.emit("postCreated", savedPost);
      return;

      //   res.status(201).json({
      //     message: "Post created successfully",
      //     savedPost,
      //   });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // router.get("/all", async (req, res) => {
  //     try {
  //     const posts = await Post.find()
  //         .populate("user", "name profilePic")
  //         .populate("tags", "name")
  //         .populate({
  //             path: "categories",
  //             select: "name",
  //         })
  //         .populate({

  return router;
};

export default setupPostRoutes;
