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
import recomRoutes from "./routes/recommendation.js";
import Conversation from "./models/conversation.js";
import { Message } from "./models/message.js";

export const app = express();
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
const PORT = process.env.PORT || 8083;

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

// Recommendation
app.use("/api/v1/fitness", recomRoutes);

io.on("connection", (socket) => {
  console.log(`User connected:..... ${socket.id}`);

  socket.on("join", async (userId, otherId) => {
    socket.join(userId);
    console.log(`User ${userId} and ${otherId} joined their room`);

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, otherId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, otherId],
      });
      console.log(`New conversation created between ${userId} and ${otherId}`);
    } else {
      console.log(
        `Conversation already exists between ${userId} and ${otherId}`
      );
    }

    socket.emit("conversationId", conversation._id);
  });

  socket.on("sendMessage", async ({ conversationId, senderId, text }) => {
    const filteredGroup = await Conversation.findOne({
      _id: conversationId,
    });

    if (filteredGroup) {
      const newMessage = new Message({ conversationId, senderId, text });
      await newMessage.save();

      filteredGroup.messages.push(newMessage._id);
      await filteredGroup.save();

      // Broadcast the message to all users in the conversation
      socket
        .to(
          filteredGroup.participants.map((participant) =>
            participant.toString()
          )
        )
        .emit("receiveMessages", {
          conversationId,
          messages: [newMessage],
        });
    } else {
      console.error(`Group with ID ${conversationId} not found`);
    }
  });

  socket.on("allMessageOfUser", async ({ conversationId }) => {
    try {
      // Fetch all messages for the given conversation ID
      const messages = await Message.find({ conversationId }).populate(
        "senderId",
        "username role profilePic"
      );

      console.log("messanges sent ");

      // Emit the messages back to the client
      socket.emit("receiveMessages", { conversationId, messages });
    } catch (error) {
      console.error("Error retrieving messages:", error);
      socket.emit("error", { message: "Failed to retrieve messages." });
    }
  });

  socket.on("editMessage", async ({ messageId, text }) => {
    try {
      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        { $set: { text } },
        { new: true }
      );

      if (updatedMessage) {
        io.emit("messageUpdated", {
          messageId: updatedMessage._id,
          text: updatedMessage.text,
        });
      } else {
        console.log("Message not found");
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  });

  socket.on("deleteMessage", async ({ messageId }) => {
    await Message.findByIdAndDelete(messageId);

    io.emit("messageDeleted", messageId);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
