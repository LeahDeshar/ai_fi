import axios from "axios";
import { client } from "../util/redis.js";

client
  .on("connect", () => {
    console.log("Connected to Redis");
  })
  .on("error", () => {
    console.log("Error connecting to Redis");
  });

export const getExerciseRecomController = async (req, res) => {
  try {
    const { target_input, k } = req.body;

    const cacheKey = `exe-recom:${target_input}:${k}`;

    // Check if the response is in cache
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.json({
        exeData: JSON.parse(cachedData),
      });
    }

    const response = await axios.post(
      "http://localhost:8000/recommend_exercises",
      {
        target_input: target_input,
        k: k,
      }
    );

    res.json({
      exeData: response.data.exercises,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing data with FastAPI" });
  }
};

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
