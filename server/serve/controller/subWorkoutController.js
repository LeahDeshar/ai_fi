import SubWorkout from "../models/workout.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../util/features.js";

export const createSubWorkoutController = async (req, res) => {
  try {
    const { name, duration, calorieBurn, focusZones } = req.body;
    console.log(req.body);

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
