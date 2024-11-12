import cron from "node-cron";
import User from "../models/user";
import { checkAndCreateActivity } from "../controller/activityController";

let isCronInitialized = false;

export const initializeCronJob = () => {
  if (isCronInitialized) return;

  cron.schedule("50 13 * * *", async () => {
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
