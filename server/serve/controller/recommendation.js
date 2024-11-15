import axios from "axios";
import { client } from "../util/redis.js";
import YTmodel from "../models/YTSchema.js";
import profileModel from "../models/profile.js";

// export const getExerciseRecomController = async (req, res) => {
//   try {
//     const { target_input, k } = req.query;

//     const userId = req.user._id;

//     // find user in profile model
//     const profile = await Profile.findOne({ user: userId });

//     console.log(target_input, k);

//     const cacheKey = `exe-recom:${target_input}:${k}`;

//     // Check if the response is in cache
//     const cachedData = await client.get(cacheKey);
//     if (cachedData) {
//       console.log("Cache hit");
//       return res.json({
//         exeData: JSON.parse(cachedData),
//       });
//     }

//     // const response = await axios.post(
//     //   "http://localhost:8000/recommend_exercises",
//     //   {
//     //     target_input: target_input,
//     //     k: k,
//     //   }
//     // );

//     const response = await axios.post(
//       "https://aifi-py-server.onrender.com/recommend_exercises",
//       {
//         target_input: target_input,
//         k: k,
//       }
//     );

//     // cache the response
//     await client.set(cacheKey, JSON.stringify(response.data.exercises));

//     res.json({
//       exeData: response.data.exercises,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Error processing data with FastAPI" });
//   }
// };

export const getExerciseRecomController = async (req, res) => {
  try {
    const { target_input, k } = req.query;
    const userId = req.user._id;

    // Fetch user profile
    const profile = await profileModel.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    // Extract user-specific data
    const { currentWeight, preferredUnits } = profile;

    // Calculate weight in kilograms if units are imperial
    let weightInKg = currentWeight.kilograms || 0;
    if (preferredUnits === "imperial" && currentWeight.pounds) {
      weightInKg = currentWeight.pounds * 0.453592; // Convert pounds to kg
    }

    const cacheKey = `exe-recom:${target_input}:${k}:${userId}`;

    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.json({
        exeData: JSON.parse(cachedData),
      });
    }

    const response = await axios.post(
      "https://aifi-py-server.onrender.com/recommend_exercises",
      {
        target_input,
        k,
      }
    );

    const exercisesWithCalories = response.data.exercises.map((exercise) => {
      const MET = estimateMET(exercise.target); // Estimate MET based on target muscle
      const caloriesBurned = calculateCaloriesBurned(weightInKg, MET);
      return {
        ...exercise,
        estimatedCaloriesBurned: caloriesBurned,
      };
    });

    await client.set(cacheKey, JSON.stringify(exercisesWithCalories));

    res.json({
      exeData: exercisesWithCalories,
    });
  } catch (error) {
    console.error("Error in getExerciseRecomController:", error);
    res.status(500).json({ error: "Error processing data with FastAPI" });
  }
};

/**
 * Estimate MET (Metabolic Equivalent Task) for an exercise based on the target muscle.
 * @param {string} target - Target muscle for the exercise.
 * @returns {number} Estimated MET value.
 */
function estimateMET(target) {
  const METValues = {
    lats: 6.0, // Example MET for lat exercises
    back: 5.5,
    chest: 6.3,
    legs: 7.0,
    arms: 5.0,
    // Add more mappings as needed
  };
  return METValues[target.toLowerCase()] || 5.0; // Default MET if target not found
}

/**
 * Calculate calories burned during an exercise.
 * @param {number} weight - User's weight in kilograms.
 * @param {number} MET - Metabolic Equivalent Task value.
 * @returns {number} Estimated calories burned per minute.
 */
function calculateCaloriesBurned(weight, MET) {
  const durationMinutes = 10; // Assuming 10 minutes per exercise
  return ((MET * weight * 3.5) / 200) * durationMinutes;
}

export const getSleepRecomController = async (req, res) => {
  try {
    const {
      Gender,
      Age,
      Occupation,
      Physical_Activity_Level,
      Stress_Level,
      BMI_Category,
    } = req.body;

    const response = await axios.post("http://localhost:8000/predict-sleep", {
      Gender,
      Age,
      Occupation,
      Physical_Activity_Level,
      Stress_Level,
      BMI_Category,
    });

    res.json({
      sleep: response.data.predicted_sleep_duration,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing data with FastAPI" });
  }
};

export const getYtChannelRecomController = async (req, res) => {
  try {
    const { video_id } = req.body;

    const response = await axios.post("http://localhost:8000/recommend_yt", {
      video_id,
    });

    res.json({
      video: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing data with FastAPI" });
  }
};

export const fetchYtData = async (req, res) => {
  try {
    const cacheKey = "ytData:allVideos";

    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    const videos = await YTmodel.find();
    await client.set(cacheKey, JSON.stringify(videos), "EX", 604800);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

export const getCalorieRecomController = async (req, res) => {
  try {
    const { age, weight_kg, height_m, gender, BMI, BMR, activity_level } =
      req.body;

    const response = await axios.post("http://localhost:8000/predict-calorie", {
      age,
      weight_kg,
      height_m,
      gender,
      BMI,
      BMR,
      activity_level,
    });

    res.json({
      calorie: response.data.predicted_calories,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing data with FastAPI" });
  }
};

export const getDietRecomController = async (req, res) => {
  try {
    const { recipe_id, k } = req.body;

    const response = await axios.post("http://localhost:8000/recommend-diet", {
      recipe_id,
      k,
    });

    res.json({
      diet: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing data with FastAPI" });
  }
};
// test
export const test = async (req, res) => {
  try {
    res.json({ message: "Test successful" });
  } catch (error) {
    res.status(500).json({ error: "Error processing data with FastAPI" });
  }
};
