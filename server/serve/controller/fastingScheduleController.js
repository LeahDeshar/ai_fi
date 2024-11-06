import FastingSchedule from "../models/FastingScheduleSchema.js";

export const chooseFastingSchController = async (req, res) => {
  try {
    const { startTime, fastingHours, eatingHours } = req.body;
    const user = req.user._id;
    const endTime = new Date(
      new Date(startTime).getTime() + fastingHours * 60 * 60 * 1000
    );
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

// export const updateUserSchedule = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const updatedSchedule = await FastingSchedule.findOneAndUpdate(
//       { _id: id },
//       updates,
//       { new: true, runValidators: true }
//     );

//     if (!updatedSchedule) {
//       return res.status(404).json({ message: "Fasting schedule not found" });
//     }

//     res.json({ message: "Fasting schedule updated", updatedSchedule });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export const updateUserSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.fastingHours) {
      updates.eatingHours = 24 - updates.fastingHours;
    }

    if (updates.startTime || updates.fastingHours) {
      const startTime = updates.startTime
        ? new Date(updates.startTime)
        : new Date();

      if (updates.fastingHours) {
        const fastingDurationInMs = updates.fastingHours * 60 * 60 * 1000;
        updates.endTime = new Date(startTime.getTime() + fastingDurationInMs);
      } else if (!updates.endTime) {
        const fastingDurationInMs =
          (updates.fastingHours || 16) * 60 * 60 * 1000;
        updates.endTime = new Date(startTime.getTime() + fastingDurationInMs);
      }
    }

    const updatedSchedule = await FastingSchedule.findOneAndUpdate(
      { _id: id },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Fasting schedule not found" });
    }

    res.json({
      message: "Fasting schedule updated",
      updatedSchedule,
      // time in string
      startTime: updatedSchedule.startTime.toLocaleString(),
      endTime: updatedSchedule.endTime.toLocaleString(),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
