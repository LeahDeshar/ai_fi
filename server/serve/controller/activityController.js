import UserActivity from "../models/activitySchema.js";
import FastingSchedule from "../models/FastingScheduleSchema.js";
import WeeklySummary from "../models/weeklySummarySchema.js";
import { client } from "../util/redis.js";

// cron.schedule("50 13 * * *", async () => {
//   console.log("Running daily activity check for all users...");

//   try {
//     const users = await User.find({ profile: { $ne: null } }, "_id");
//     const userIds = users.map((user) => user._id);

//     // Call checkAndCreateActivity for each user
//     await Promise.all(
//       userIds.map(async (userId) => {
//         try {
//           await checkAndCreateActivity(userId);
//           console.log(`Daily activity checked/created for user ${userId}`);
//         } catch (error) {
//           console.error(`Error processing activity for user ${userId}:`, error);
//         }
//       })
//     );
//     console.log("Daily activity check completed for all users.");
//   } catch (error) {
//     console.error("Error fetching users for daily activity check:", error);
//   }
// });

export const checkAndCreateActivity = async (userId) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const activityExists = await UserActivity.findOne({
    userId: userId,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  // If activity doesn't exist, create a new one
  if (!activityExists) {
    // Fetch the user's current fasting settings
    let fastingSchedule = await FastingSchedule.findOne({
      user: userId,
      isActive: true,
    });

    if (!fastingSchedule) {
      const defaultFastingHours = 16;
      const defaultEatingHours = 8;
      const startTime = new Date();
      const endTime = new Date(
        startTime.getTime() + defaultFastingHours * 60 * 60 * 1000
      );

      fastingSchedule = new FastingSchedule({
        user: userId,
        fastingHours: defaultFastingHours,
        eatingHours: defaultEatingHours,
        startTime: startTime,
        endTime: endTime,
        isActive: true,
      });

      await fastingSchedule.save();
      console.log(`Created new fasting schedule for user ${userId}.`);
    }

    const { fastingHours, eatingHours, startTime } = fastingSchedule;
    const fastingEndTime = new Date(
      startTime.getTime() + fastingHours * 60 * 60 * 1000
    );

    const newActivity = new UserActivity({
      userId: userId,
      date: startOfDay,
      waterIntake: 0,
      calorieIntake: 0,
      sleepDuration: 0,
      dailySteps: 0,
      fastingOption: `${fastingHours}:${eatingHours}`,
      fastingStartTime: startTime,
      fastingEndTime: fastingEndTime,
      isFastingAdhered: false,
      fastingDeviation: 0,
    });

    await newActivity.save();
    console.log(`Created new activity for user ${userId} for today.`);
  } else {
    console.log(`Activity for user ${userId} already exists for today.`);
  }
};

// http://localhost:8080/api/v1/daily/activity
export const createActivityForNextDay = async (req, res) => {
  try {
    const userId = req.user._id;
    await checkAndCreateActivity(userId);

    res
      .status(200)
      .json({ message: "Activity record checked and created for today." });
  } catch (error) {
    res.status(500).json({
      message: "Error while checking and creating activity record.",
      error: error.message,
    });
  }
};

// http://localhost:8080/api/v1/daily/activity
export const getUserActivity = async (req, res) => {
  // try {
  //   // const { date } = req.params;

  //   // console.log(date);
  //   // today date
  //   const today = new Date();
  //   const startOfDay = new Date(today.setHours(0, 0, 0, 0));

  //   const userId = req.user._id;
  //   // const startOfDay = new Date(date);
  //   // startOfDay.setHours(0, 0, 0, 0);

  //   const endOfDay = new Date(date);
  //   endOfDay.setHours(23, 59, 59, 999);

  //   const activity = await UserActivity.findOne({
  //     userId,
  //     date: { $gte: startOfDay, $lte: endOfDay },
  //   });

  //   if (!activity) {
  //     return res
  //       .status(404)
  //       .json({ message: "Activity not found for this date." });
  //   }

  //   return res.json({ activity });
  // } catch (error) {
  //   console.error(error);
  //   return res
  //     .status(500)
  //     .json({ message: "Server error", error: error.message });
  // }

  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Set time to 00:00:00
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Set time to 23:59:59

    const userId = req.user._id;

    // Find activity for the user within today's date range
    const activity = await UserActivity.findOne({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay }, // Match the date for the entire day
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found for today." });
    }

    return res.json({ activity });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// update today's data
// http://localhost:8080/api/v1/daily/activity
export const updateUserActivity = async (req, res) => {
  try {
    // const { date } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    console.log(updates);
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // const startOfDay = new Date(date);
    // startOfDay.setHours(0, 0, 0, 0);

    // const endOfDay = new Date(date);
    // endOfDay.setHours(23, 59, 59, 999);

    const updatedActivity = await UserActivity.findOneAndUpdate(
      { userId, date: { $gte: startOfDay, $lte: endOfDay } },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedActivity) {
      return res
        .status(404)
        .json({ message: "Activity not found for this date." });
    }

    return res.json({
      message: "Activity updated successfully",
      updatedActivity,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// delete all the useractivity of the user
export const deleteAllUserActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    await UserActivity.deleteMany({ userId });
    res.status(200).json({ message: "All activities deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting activities", error });
  }
};

// get all the useractivity of the user
export const getAllUserActivity = async (req, res) => {
  try {
    const userId = req.user._id;

    const cacheKey = `user-activity:${userId}`;
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      req.io.emit("userActivities", { activities: JSON.parse(cachedData) });

      console.log("Data retrieved from cache");
      return res.status(200).json({ activities: JSON.parse(cachedData) });
    }

    const activities = await UserActivity.find({ userId });
    req.io.emit("userActivities", { activities });

    client.set(cacheKey, JSON.stringify(activities), "EX", 259200);

    res.status(200).json({ activities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting activities", error });
  }
};

// get the weekly data
export const getUserActivityThisWeek = async (req, res) => {
  try {
    const today = new Date();

    // Calculate the start of the week (Sunday at 00:00:00)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Move to Sunday
    startOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00

    // Calculate the end of the week (Saturday at 23:59:59.999)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() - today.getDay() + 6); // Move to Saturday
    endOfWeek.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

    const userId = req.user._id;

    // Find all user activities for the current week
    const activities = await UserActivity.find({
      userId,
      date: { $gte: startOfWeek, $lte: endOfWeek }, // Match activities within this week's range
    });

    if (!activities.length) {
      return res
        .status(404)
        .json({ message: "No activity found for this week." });
    }

    return res.json({ activities });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
