import axios from "axios";

export const getExerciseRecomController = async (req, res) => {
  try {
    const { fitnessData } = req.body;

    const response = await axios.get("http://localhost:8000/recommend-exes", {
      params: { target_input: fitnessData },
    });

    res.json({
      exeData: response.data.recommendations,
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
