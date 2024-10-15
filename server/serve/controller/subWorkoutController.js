import SubWorkout from "../models/subworkout.js";
import Workout from "../models/workout.js";

import cloudinary from "cloudinary";
import { getDataUri } from "../util/features.js";

export const createSubWorkoutController = async (req, res) => {
  try {
    const { name, duration, calorieBurn, focusZones, workoutId } = req.body;

    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    let workoutPicData = {};
    if (req.body.image) {
      const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "subworkouts",
      });
      workoutPicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (req.file) {
      const file = getDataUri(req.file);
      const result = await cloudinary.v2.uploader.upload(file.content, {
        folder: "subworkouts",
      });
      workoutPicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Create the new sub-workout
    const newSubWorkout = new SubWorkout({
      name,
      duration,
      calorieBurn,
      focusZones,
      image: workoutPicData,
      equipment: [],
      workSession: [],
    });

    const savedSubWorkout = await newSubWorkout.save();
    workout.subWorkouts.push(savedSubWorkout._id);
    await workout.save();
    res.status(201).json({
      message: "Sub-workout created successfully!",
      subWorkout: savedSubWorkout,
    });
  } catch (error) {
    console.error("Error creating sub-workout:", error);
    res.status(500).json({
      message: "Failed to create sub-workout. Please try again later.",
      error: error.message,
    });
  }
};

// get all the subworkout
export const getAllSubWorkoutController = async (req, res) => {
  try {
    const subWorkouts = await SubWorkout.find();
    res.status(200).json({ subWorkouts });
  } catch (error) {
    console.error("Error getting sub-workouts:", error);
    res.status(500).json({
      message: "Failed to get sub-workouts. Please try again later.",
      error: error.message,
    });
  }
};
