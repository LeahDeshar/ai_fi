import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import Friendship from "../models/friendshipSchema.js";
const router = express.Router();

const setupFriendRoutes = (io) => {
  router.post("/request", async (req, res) => {
    const { requester, recipient } = req.body;

    try {
      const newRequest = await Friendship.create({
        requester,
        recipient,
        status: "pending",
      });

      io.to(recipient).emit("friendRequest", {
        message: "You have a new friend request!",
        requesterId: requester,
      });

      res
        .status(200)
        .json({ message: "Friend request sent", request: newRequest });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  });

  return router;
};

export default setupFriendRoutes;
