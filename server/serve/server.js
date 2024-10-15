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

io.on("connection", (socket) => {});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
