import UserActivity from "../models/activitySchema";

export const getUserActivity = async (req, res) => {
  try {
    const { date } = req.body;
    const userId = req.user._id;
    // Ensure the date is in the correct format (e.g., 'YYYY-MM-DD')
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Find the activity for the user within the specific date range
    const activity = await UserActivity.findOne({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!activity) {
      return res
        .status(404)
        .json({ message: "Activity not found for this date." });
    }

    return res.json({ activity });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateUserActivity = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const updatedActivity = await Activity.findOneAndUpdate(
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
