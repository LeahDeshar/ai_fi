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

// test
export const test = async (req, res) => {
  try {
    res.json({ message: "Test successful" });
  } catch (error) {
    res.status(500).json({ error: "Error processing data with FastAPI" });
  }
};
