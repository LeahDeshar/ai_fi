import Exercises from "../models/ExerciseModel.js"; // Adjust the import path as necessary
import cloudinary from "cloudinary";
import SubWorkout from "../models/subworkout.js";
import { getDataUri } from "../util/features.js";

export const createWorkSessionController = async (req, res) => {
  try {
    // Validate required fields
    const {
      title,
      duration,
      desc,
      howTo,
      commonMistake,
      tips,
      workType,
      suboutId,
    } = req.body;

    const subWorkout = await SubWorkout.findById(suboutId);
    if (!subWorkout) {
      return res.status(404).json({ message: "Sub Workout not found." });
    }

    let workoutPicData = {};
    if (req.body.image) {
      const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "worksession",
      });
      workoutPicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (req.file) {
      const file = getDataUri(req.file);
      const result = await cloudinary.v2.uploader.upload(file.content, {
        folder: "worksession",
      });
      workoutPicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    let videoFile = {};
    if (req.body.video) {
      const result = await cloudinary.v2.uploader.upload(req.body.video, {
        folder: "worksession",
      });
      videoFile = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (req.file) {
      const file = getDataUri(req.file);
      const result = await cloudinary.v2.uploader.upload(file.content, {
        folder: "worksession",
      });
      videoFile = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // let videoFile = {};
    // if (req.files.video) {
    //   const videoDataUri = getDataUri(req.files.video);
    //   const uploadedVideo = await cloudinary.v2.uploader.upload(
    //     videoDataUri.content,
    //     { resource_type: "video" }
    //   );
    //   videoFile = {
    //     public_id: uploadedVideo.public_id,
    //     url: uploadedVideo.secure_url,
    //   };
    // }

    // Create the new exercise
    const newExercise = new Exercises({
      title,
      image: workoutPicData,
      video: videoFile,
      duration,
      desc,
      howTo,
      commonMistake,
      tips,
      workType,
    });

    const savedExercise = await newExercise.save();

    subWorkout.workSession.push(savedExercise._id);
    await subWorkout.save();

    res.status(201).json({
      message: "Exercise created successfully!",
      exercise: savedExercise,
      subWorkout,
    });
  } catch (error) {
    console.error("Error creating exercise:", error);
    res.status(500).json({
      message: "Failed to create exercise. Please try again later.",
      error: error.message,
    });
  }
};
