import FastingSchedule from "../models/FastingScheduleSchema";

export const chooseFastingSchController = async (req, res) => {
  try {
    const { startTime, endTime, fastingHours, eatingHours } = req.body;
    const user = req.user._id;
    const fastingSchedule = new FastingSchedule({
      user,
      startTime,
      endTime,
      fastingHours,
      eatingHours,
      isActive: true,
    });
    await fastingSchedule.save();
    res
      .status(201)
      .json({ message: "Fasting schedule created", fastingSchedule });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserSchedule = async (req, res) => {
  try {
    const userId = req.user._id;
    const fastingSchedule = await FastingSchedule.findOne({
      user: userId,
      isActive: true,
    });
    if (!fastingSchedule) {
      return res
        .status(404)
        .json({ message: "No active fasting schedule found" });
    }
    res.status(200).json({
      message: "Fasting schedule retrieved",
      schedule: fastingSchedule,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedSchedule = await FastingSchedule.findOneAndUpdate(
      { _id: id },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Fasting schedule not found" });
    }

    res.json({ message: "Fasting schedule updated", updatedSchedule });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
