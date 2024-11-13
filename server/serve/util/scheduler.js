import cron from "node-cron";
import User from "../models/user.js";
import { checkAndCreateActivity } from "../controller/activityController.js";
import axios from "axios";
import UserActivity from "../models/activitySchema.js";
import mongoose from "mongoose";
import { Expo } from "expo-server-sdk";
let expo = new Expo();
let isCronInitialized = false;

export const initializeCronJob = () => {
  console.log("init job");
  if (isCronInitialized) return;

  cron.schedule("0 0 * * *", async () => {
    console.log("Running daily activity check for all users...");

    try {
      const users = await User.find({ profile: { $ne: null } }, "_id");
      const userIds = users.map((user) => user._id);

      // Call checkAndCreateActivity for each user
      await Promise.all(
        userIds.map(async (userId) => {
          try {
            await checkAndCreateActivity(userId);
            console.log(`Daily activity checked/created for user ${userId}`);
          } catch (error) {
            console.error(
              `Error processing activity for user ${userId}:`,
              error
            );
          }
        })
      );
      console.log("Daily activity check completed for all users.");
    } catch (error) {
      console.error("Error fetching users for daily activity check:", error);
    }
  });

  console.log("Daily activity scheduler initialized.");
  isCronInitialized = true;
};

export const scheduleNotification = (userId, notification) => {
  console.log(`Scheduling notification for user ${userId}:`, notification);
  // Add logic to queue or send notification here
};

export const initAnomalyDetection = () => {
  console.log("Daily anomaly check initiated.");

  cron.schedule("40 23 * * *", async () => {
    console.log("Running daily anomaly check at 5 PM");

    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const userActivities = await UserActivity.find({
        date: { $gte: startOfDay, $lte: endOfDay },
      });

      const anomalyNotifications = [];

      for (const activity of userActivities) {
        try {
          const response = await axios.post(
            "http://localhost:8000/check_anomaly/",
            {
              waterIntake: activity.waterIntake,
              calorieIntake: activity.calorieIntake,
              sleepDuration: activity.sleepDuration,
              dailySteps: activity.dailySteps,
            }
          );

          console.log(response.data);

          if (response.status === 200 && response.data.is_anomaly) {
            const { shap_values } = response.data;
            const negativeFeatures = [];

            // Loop through each feature and check for negative SHAP values
            for (const [feature, shapValue] of Object.entries(shap_values)) {
              if (shapValue < 0) {
                console.log(feature, shapValue);
                negativeFeatures.push(feature); // Collect features with negative SHAP values
              }
            }

            console.log(negativeFeatures);

            // If there are negative features, send a notification to the user
            if (negativeFeatures.length > 0) {
              let notificationMessage = "";

              // Custom message based on the number of negative features
              if (negativeFeatures.length === 4) {
                notificationMessage =
                  "Alert: Multiple health metrics detected unusual patterns. Please take care!";
              } else if (negativeFeatures.length >= 3) {
                notificationMessage = `Alert: Unusual patterns detected in ${negativeFeatures.join(
                  ", "
                )}. Please review your health data.`;
              } else {
                // Handle the case for just one or two negative features
                if (negativeFeatures.includes("sleepDuration")) {
                  notificationMessage +=
                    "Your sleep duration seems off. Please ensure you are getting enough rest. ";
                }
                if (negativeFeatures.includes("dailySteps")) {
                  notificationMessage +=
                    "Your daily step count is lower than expected. Consider getting more physical activity. ";
                }
                if (negativeFeatures.includes("waterIntake")) {
                  notificationMessage +=
                    "Your water intake is below the recommended levels. Make sure to stay hydrated. ";
                }
                if (negativeFeatures.includes("calorieIntake")) {
                  notificationMessage +=
                    "Your calorie intake seems irregular. Please review your diet and eating habits.";
                }
              }

              // Add to the list of notifications to send later
              anomalyNotifications.push({
                userId: activity.userId,
                message: notificationMessage,
              });

              console.log(
                `Anomaly detected for user ${activity.userId}. Notification scheduled.`
              );
            } else {
              console.log(`No negative anomalies for user ${activity.userId}`);
            }
          } else {
            console.log(`No anomaly for user ${activity.userId}`);
          }
        } catch (error) {
          console.error("Error posting data:", error.message);
        }
      }

      if (anomalyNotifications.length > 0) {
        console.log(anomalyNotifications);

        console.log("wait send the notification 1 min");
        cron.schedule("*/1 * * * *", () => {
          console.log("start");
          anomalyNotifications.forEach(({ userId, message }) => {
            // scheduleNotification(userId, { title: "Health Alert", message });
            sendPushNotification(userId, message);
          });
        });
      }
    } catch (error) {
      console.error("Error in daily anomaly check:", error.message);
    }
  });
};
initAnomalyDetection();

const sendPushNotification = async (userId, message) => {
  try {
    // Fetch the user's Expo push token from your database (you should store these tokens when the user registers)
    // const user = await getUserById(userId); // Replace with your actual method to get user by ID
    const pushToken = "ExponentPushToken[oc9gz9G8LLmiy3ga_pw88X]"; // Assumes you store the push token in the user document

    if (!Expo.isExpoPushToken(pushToken)) {
      console.log(`Push token for user ${userId} is not a valid Expo token`);
      return;
    }

    // Create a message to send via Expo Push Notification
    const messagePayload = {
      to: pushToken,
      sound: "default",
      title: "Health Alert",
      body: message,
      data: { userId: userId }, // You can include additional data here, such as user-specific information
    };

    // Send notification
    const ticket = await expo.sendPushNotificationsAsync([messagePayload]);
    console.log(`Notification sent to user ${userId}: ${message}`);
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

// today's mock data
const updateTodayActivitiesWithMockData = async () => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Find today's activities
    const todayActivities = await UserActivity.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    console.log(`Found ${todayActivities.length} activities for today.`);

    for (const activity of todayActivities) {
      const waterIntake = parseFloat((Math.random() * 1000 + 2000).toFixed(2));
      const calorieIntake = Math.floor(Math.random() * 1700 + 1300);
      const sleepDuration = parseFloat((Math.random() * 8).toFixed(2));
      const dailySteps = Math.floor(Math.random() * 20000);

      await UserActivity.updateOne(
        { _id: activity._id },
        {
          $set: {
            waterIntake,
            calorieIntake,
            sleepDuration,
            dailySteps,
          },
        }
      );

      console.log(`Updated activity for user ${activity.userId}`);
    }
  } catch (error) {
    console.error("Error updating today's activities:", error);
  } finally {
    mongoose.connection.close();
  }
};

// updateTodayActivitiesWithMockData();
