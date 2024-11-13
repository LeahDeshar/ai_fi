import cron from "node-cron";
import User from "../models/user.js";
import { checkAndCreateActivity } from "../controller/activityController.js";
import axios from "axios";
import UserActivity from "../models/activitySchema.js";
import mongoose from "mongoose";

let isCronInitialized = false;

export const initializeCronJob = () => {
  console.log("init job");
  if (isCronInitialized) return;

  cron.schedule("45 0 * * *", async () => {
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

// export const initAnomalyDetection = () => {
//   cron.schedule("0 17 * * *", async () => {
//     console.log("Running daily anomaly check at 5 PM");

//     try {
//       const today = new Date();
//       const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Set time to 00:00:00
//       const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Set time to 23:59:59

//       const userActivities = await UserActivity.findOne({
//         date: { $gte: startOfDay, $lte: endOfDay },
//       });

//       for (const activity of userActivities) {
//         const response = await axios.post(
//           "http://localhost:8000/check_anomaly/",
//           {
//             waterIntake: activity.waterIntake,
//             calorieIntake: activity.calorieIntake,
//             sleepDuration: activity.sleepDuration,
//             dailySteps: activity.dailySteps,
//           }
//         );

//         if (response.status === 200 && response.data.is_anomaly) {
//           // If anomaly detected, trigger a notification
//           // scheduleNotification(activity.user_id, response.data);
//           console.log(
//             `Anomaly detected for user ${activity.user_id}, notification scheduled.`
//           );
//         } else {
//           console.log(`No anomaly for user ${activity.user_id}`);
//         }
//       }
//     } catch (error) {
//       console.error("Error in daily anomaly check:", error.message);
//     }
//   });
// };
// export const initAnomalyDetection = () => {
//   console.log("Daily anomaly check");
//   cron.schedule("49 21 * * *", async () => {
//     console.log("Running daily anomaly check at 5 PM");
//     let anomalyUserIds = [];

//     try {
//       const startOfDay = new Date();
//       startOfDay.setHours(0, 0, 0, 0);

//       const endOfDay = new Date();
//       endOfDay.setHours(23, 59, 59, 999);

//       const userActivities = await UserActivity.find({
//         date: { $gte: startOfDay, $lte: endOfDay },
//       });

//       for (const activity of userActivities) {
//         try {
//           const response = await axios.post(
//             "http://localhost:8000/check_anomaly/",
//             {
//               waterIntake: Number(activity.waterIntake),
//               calorieIntake: Number(activity.calorieIntake),
//               sleepDuration: Number(activity.sleepDuration),
//               dailySteps: Number(activity.dailySteps),
//             }
//           );

//           console.log(
//             `Anomaly detected for user ${activity.userId}, notification scheduled.`
//           );

//           if (response.status === 200 && response.data.is_anomaly) {
//             // If anomaly detected, add userId to the list
//             anomalyUserIds.push(activity.userId);
//             console.log(
//               `Anomaly detected for user ${activity.userId}. Notification scheduled.`
//             );
//           } else {
//             console.log(`No anomaly for user ${activity.userId}`);
//           }
//         } catch (error) {
//           console.error(
//             "Error posting data:",
//             error.response?.data || error.message
//           );
//         }
//         await new Promise((resolve) => setTimeout(resolve, 500));
//       }
//     } catch (error) {
//       console.error("Error in daily anomaly check:", error.message);
//     }
//   });
// };

// initAnomalyDetection();

export const scheduleNotification = (userId, notification) => {
  console.log(`Scheduling notification for user ${userId}:`, notification);
  // Add logic to queue or send notification here
};

export const initAnomalyDetection = () => {
  console.log("Daily anomaly check initiated.");

  cron.schedule("53 22 * * *", async () => {
    console.log("Running daily anomaly check at 5 PM");

    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const userActivities = await UserActivity.find({
        date: { $gte: startOfDay, $lte: endOfDay },
      });

      //   const anomalyNotifications = []; // Array to store notifications for anomalies
      //   const SHAP_THRESHOLD = 0.5; // Define a threshold for SHAP values to consider a feature anomalous

      //   for (const activity of userActivities) {
      //     try {
      //       const response = await axios.post(
      //         "http://localhost:8000/check_anomaly/",
      //         {
      //           waterIntake: activity.waterIntake,
      //           calorieIntake: activity.calorieIntake,
      //           sleepDuration: activity.sleepDuration,
      //           dailySteps: activity.dailySteps,
      //         }
      //       );

      //       if (response.status === 200 && response.data.is_anomaly) {
      //          if (response.status === 200 && response.data.is_anomaly) {
      //   const { shap_values } = response.data;
      //   const negativeFeatures = [];

      //   // Loop through each feature and check for negative SHAP values
      //   for (const [feature, shapValue] of Object.entries(shap_values)) {
      //     if (shapValue < 0) {
      //       negativeFeatures.push(feature); // Collect features with negative SHAP values
      //     }
      //   }

      //   // If there are negative features, send a notification to the user
      //   if (negativeFeatures.length > 0) {
      //     let notificationMessage = "";

      //     if (negativeFeatures.length === 4) {
      //       notificationMessage = "Alert: Multiple health metrics detected unusual patterns. Please take care!";
      //     } else if (negativeFeatures.length >= 3) {
      //       notificationMessage = `Alert: Unusual patterns detected in ${negativeFeatures.join(", ")}. Please review your health data.`;
      //     } else {
      //       notificationMessage = `Alert: Unusual pattern detected in ${negativeFeatures.join(", ")}. Please monitor this aspect of your health.`;
      //     }

      //     // Add to the list of notifications to send later
      //     anomalyNotifications.push({
      //       userId: activity.userId,
      //       message: notificationMessage,
      //     });

      //     console.log(`Anomaly detected for user ${activity.userId}. Notification scheduled.`);
      //   } else {
      //     console.log(`No negative anomalies for user ${activity.userId}`);
      //   }
      // } else {
      //   console.log(`No anomaly for user ${activity.userId}`);
      // }
      //         // Store the notification to be sent later
      //         anomalyNotifications.push({
      //           userId: activity.userId,
      //           message: notificationMessage,
      //         });
      //         console.log(
      //           `Anomaly detected for user ${activity.userId}. Notification scheduled.`
      //         );
      //       } else {
      //         console.log(`No anomaly for user ${activity.userId}`);
      //       }
      //     } catch (error) {
      //       console.error("Error posting data:", error.message);
      //     }
      //   }

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

              if (negativeFeatures.length === 4) {
                notificationMessage =
                  "Alert: Multiple health metrics detected unusual patterns. Please take care!";
              } else if (negativeFeatures.length >= 3) {
                notificationMessage = `Alert: Unusual patterns detected in ${negativeFeatures.join(
                  ", "
                )}. Please review your health data.`;
              } else {
                notificationMessage = `Alert: Unusual pattern detected in ${negativeFeatures.join(
                  ", "
                )}. Please monitor this aspect of your health.`;
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
            scheduleNotification(userId, { title: "Health Alert", message });
          });
        });
      }
    } catch (error) {
      console.error("Error in daily anomaly check:", error.message);
    }
  });
};
initAnomalyDetection();
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
