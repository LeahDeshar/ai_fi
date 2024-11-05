import Workout from "../models/workout.js";
import SubWorkout from "../models/subworkout.js";
import cloudinary from "cloudinary";

import { getDataUri } from "../util/features.js";
import { client } from "../util/redis.js";

export const createWorkoutController = async (req, res) => {
  try {
    const workoutData = req.body;
    let workoutPicData = {};

    // Check if the image data is a URL
    if (workoutData.image) {
      const result = await cloudinary.v2.uploader.upload(workoutData.image, {
        folder: "workouts",
      });
      workoutPicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (req.file) {
      const file = getDataUri(req.file);
      const result = await cloudinary.v2.uploader.upload(file.content, {
        folder: "workouts",
      });
      workoutPicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    const newWorkout = new Workout({
      title: workoutData.title,
      image: workoutPicData,
      subWorkout: workoutData.subWorkout,
    });

    const savedWorkout = await newWorkout.save();

    res.status(201).json({
      message: "Workout created successfully!",
      workout: savedWorkout,
    });
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({
      message: "Failed to create workout. Please try again later.",
      error: error.message,
    });
  }
};

export const getWorkoutController = async (req, res) => {
  try {
    const cacheKey = "allWorkouts";

    const cachedWorkouts = await client.get(cacheKey);
    if (cachedWorkouts) {
      const workoutsData = JSON.parse(cachedWorkouts);
      return res.status(200).json({
        message: "Workout fetched successfully from cache!",
        workout: workoutsData,
        source: "cache",
      });
    }
    const workout = await Workout.find().populate({
      path: "subWorkouts",
    });
    await client.set(cacheKey, JSON.stringify(workout), {
      EX: 3600,
    });
    res.status(201).json({
      message: "Workout fetched successfully!",
      workout,
    });
  } catch (error) {
    console.error("Error fetching workout:", error);
    res.status(500).json({
      message: "Failed to fetch workout. Please try again later.",
      error: error.message,
    });
  }
};

export const getWorkoutByIdController = async (req, res) => {
  try {
    const workoutId = req.params.id;
    const cacheKey = `workoutById:${workoutId}`; // Define a unique cache key for the specific workout

    // Check if the workout data is cached
    const cachedWorkout = await client.get(cacheKey);
    if (cachedWorkout) {
      // If cached data exists, parse it and return
      const workoutData = JSON.parse(cachedWorkout);
      return res.status(200).json({
        message: "Workout fetched successfully from cache!",
        workout: workoutData,
        source: "cache", // Indicate that the data is from cache
      });
    }
    const workout = await Workout.findById(workoutId).populate("subWorkouts");
    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }
    await client.set(cacheKey, JSON.stringify(workout), {
      EX: 3600, // Set an expiration time of 1 hour
    });
    res.status(201).json({
      message: "Workout fetched successfully!",
      workout,
    });
  } catch (error) {
    console.error("Error fetching workout:", error);
    res.status(500).json({
      message: "Failed to fetch workout. Please try again later.",
      error: error.message,
    });
  }
};

export const updateWorkoutController = async (req, res) => {
  try {
    const workoutData = req.body;
    console.log(workoutData);
    const workoutId = req.params.id;
    console.log(workoutId);

    let workoutPicData = {};

    if (workoutData.image) {
      const result = await cloudinary.v2.uploader.upload(workoutData.image, {
        folder: "workouts",
      });
      workoutPicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (req.file) {
      const file = getDataUri(req.file);
      const result = await cloudinary.v2.uploader.upload(file.content, {
        folder: "workouts",
      });
      workoutPicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      {
        title: workoutData.title,
        image: workoutPicData,
        subWorkout: workoutData.subWorkout,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      message: "Workout updated successfully!",
      workout: updatedWorkout,
    });
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({
      message: "Failed to update workout. Please try again later.",
      error: error.message,
    });
  }
};

// delete the workout
export const deleteWorkoutController = async (req, res) => {
  try {
    const workoutId = req.params.id;
    await Workout.findByIdAndDelete(workoutId);
    res.status(201).json({
      message: "Workout deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({
      message: "Failed to delete workout. Please try again later.",
      error: error.message,
    });
  }
};
