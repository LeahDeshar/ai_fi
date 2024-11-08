import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";
import Friendship from "../models/friendshipSchema.js";
import User from "../models/user.js";
const router = express.Router();

const setupFriendRoutes = (io) => {
  router.post("/request", async (req, res) => {
    const { requester, recipient } = req.body;

    const existingRequest = await Friendship.findOne({
      requester,
      recipient,
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already exists" });
    }

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
  router.get("/requests/new", isAuth, async (req, res) => {
    const userId = req.user._id;
    try {
      //   const newRequests = await Friendship.find({
      //     recipient: userId,
      //     status: "pending",
      //   }).populate("requester", "name profilePic");

      const newRequests = await Friendship.find({
        recipient: userId,
        status: "pending",
      }).populate({
        path: "requester",
        select: "profile",
        populate: {
          path: "profile",
          model: "Profile",
          select: "name profilePic",
        },
      });

      console.log("newRequests:", JSON.stringify(newRequests, null, 2));

      res.json({ requests: newRequests });
    } catch (error) {
      console.error("Error fetching new requests:", error);
      res.status(500).json({ message: "Error fetching new requests" });
    }
  });

  router.get("/requests/pending", isAuth, async (req, res) => {
    const userId = req.user._id;
    try {
      const pendingRequests = await Friendship.find({
        requester: userId,
        status: "pending",
      }).populate({
        path: "recipient",
        select: "profile",
        populate: { path: "profile", select: "name profilePic" },
      });
      res.json({ requests: pendingRequests });
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      res.status(500).json({ message: "Error fetching pending requests" });
    }
  });

  router.get("/requests/accepted", isAuth, async (req, res) => {
    const userId = req.user._id;
    try {
      //   const acceptedFriends = await Friendship.find({
      //     $or: [
      //       { requester: userId, status: "accepted" },
      //       { recipient: userId, status: "accepted" },
      //     ],
      //   }).populate("requester recipient", "name profilePic");
      const acceptedFriends = await Friendship.find({
        $or: [
          { requester: userId, status: "accepted" },
          { recipient: userId, status: "accepted" },
        ],
      })
        .populate({
          path: "requester",
          select: "profile", // Select profile field from the User model
          populate: { path: "profile", select: "name profilePic" }, // Populate Profile fields
        })
        .populate({
          path: "recipient",
          select: "profile", // Select profile field from the User model
          populate: { path: "profile", select: "name profilePic" }, // Populate Profile fields
        });
      res.json({ requests: acceptedFriends });
    } catch (error) {
      console.error("Error fetching accepted friends:", error);
      res.status(500).json({ message: "Error fetching accepted friends" });
    }
  });

  router.get("/requests/rejected", isAuth, async (req, res) => {
    const userId = req.user._id;
    try {
      const rejectedRequests = await Friendship.find({
        $or: [
          { requester: userId, status: "rejected" },
          { recipient: userId, status: "rejected" },
        ],
      }).populate("requester recipient", "name profilePic");
      res.json({ requests: rejectedRequests });
    } catch (error) {
      console.error("Error fetching rejected requests:", error);
      res.status(500).json({ message: "Error fetching rejected requests" });
    }
  });

  router.patch("/request/accept", async (req, res) => {
    const { requestId, userId } = req.body;

    try {
      const friendship = await Friendship.findById(requestId);

      if (!friendship) {
        return res.status(404).json({ message: "Friend request not found" });
      }

      // Check if the recipient is the current user
      if (friendship.recipient.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You cannot accept this request" });
      }

      // Update the friendship status to "accepted"
      friendship.status = "accepted";
      await friendship.save();

      // Emit an event to notify the requester about the acceptance
      io.to(friendship.requester.toString()).emit(
        "friendRequestAccepted",
        friendship
      );

      res.status(200).json({ message: "Friend request accepted", friendship });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error accepting friend request" });
    }
  });

  // Reject friend request
  router.patch("/request/reject", async (req, res) => {
    const { requestId, userId } = req.body;

    try {
      const friendship = await Friendship.findById(requestId);

      if (!friendship) {
        return res.status(404).json({ message: "Friend request not found" });
      }

      // Check if the recipient is the current user
      if (friendship.recipient.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You cannot reject this request" });
      }

      // Update the friendship status to "rejected"
      friendship.status = "rejected";
      await friendship.save();

      // Emit an event to notify the requester about the rejection
      io.to(friendship.requester.toString()).emit(
        "friendRequestRejected",
        friendship
      );

      res.status(200).json({ message: "Friend request rejected", friendship });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error rejecting friend request" });
    }
  });

  router.get("/request/list", isAuth, async (req, res) => {
    try {
      const userId = req.user._id;

      const existingFriendships = await Friendship.find({
        $or: [{ requester: userId }, { recipient: userId }],
        status: { $nin: ["rejected", "blocked"] },
      });

      const excludedUserIds = existingFriendships.map((friendship) =>
        friendship.requester.toString() === userId.toString()
          ? friendship.recipient.toString()
          : friendship.requester.toString()
      );

      const availableUsers = await User.find({
        _id: { $nin: [...excludedUserIds, userId] },
      }).populate("profile");

      return res.json({
        message: "Users available for friend request",
        data: availableUsers,
      });
    } catch (error) {
      console.error("Error fetching users for friend requests:", error);
      return res.status(500).json({
        message: "Error fetching users for friend requests",
        error: error.message,
      });
    }
  });

  return router;
};

export default setupFriendRoutes;
