import SubWorkout from "../models/subworkout.js";
import Workout from "../models/workout.js";
import Equipment from "../models/Equipment.js";

import cloudinary from "cloudinary";
import { getDataUri } from "../util/features.js";

export const createEquipmentController = async (req, res) => {
  try {
    const { name, suboutId } = req.body;

    const subWorkout = await SubWorkout.findById(suboutId);
    if (!subWorkout) {
      return res.status(404).json({ message: "Sub Workout not found." });
    }

    let workoutPicData = {};
    if (req.body.image) {
      const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "Equipment",
      });
      workoutPicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (req.file) {
      const file = getDataUri(req.file);
      const result = await cloudinary.v2.uploader.upload(file.content, {
        folder: "Equipment",
      });
      workoutPicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Create the new sub-workout
    const newEquipment = new Equipment({
      name,
      image: workoutPicData,
    });

    const savedEquipment = await newEquipment.save();
    subWorkout.equipment.push(savedEquipment._id);
    await subWorkout.save();
    res.status(201).json({
      message: "Equipment created successfully!",
      Equipment: subWorkout,
      savedEquipment,
    });
  } catch (error) {
    console.error("Error creating sub-workout:", error);
    res.status(500).json({
      message: "Failed to create sub-workout. Please try again later.",
      error: error.message,
    });
  }
};
