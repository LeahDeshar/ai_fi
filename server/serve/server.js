import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { mongoose } from "mongoose";
import morgan from "morgan";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import connnectDB from "./db/config.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import subOutRoutes from "./routes/subWorkoutRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import exerciseRoutes from "./routes/exeRoutes.js";
import axios from "axios";

const app = express();
app.use(express.json());

app.use(morgan("dev"));
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

connnectDB();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PORT = process.env.PORT || 8080;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  },
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/workout", workoutRoutes);
app.use("/api/v1/subWorkout", subOutRoutes);
app.use("/api/v1/equipment", equipmentRoutes);
app.use("/api/v1/exercise", exerciseRoutes);

app.get("/api/v1/predict-fitness", async (req, res) => {
  try {
    const { fitnessData } = req.body;

    console.log(fitnessData);

    console.log(
      `http://localhost:8000/recommend-exes?target_input=${fitnessData}`
    );

    const response = await axios.get("http://localhost:8000/recommend-exes", {
      params: { target_input: fitnessData },
    });

    res.json({
      exeData: response.data.recommendations,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing data with FastAPI" });
  }
});

app.get("/api/v1/test", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8000/");
    console.log("Test");

    res.json({
      message: "teset",
    });
  } catch (error) {
    console.error("Error fetching data from FastAPI:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
  }
});

io.on("connection", (socket) => {});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
