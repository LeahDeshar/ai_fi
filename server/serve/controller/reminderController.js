import Reminder from "../models/reminderSchema.js";

// {
//     "name": "Toned Back",
//     "duration": 4,
//     "image": "https://www.teachersgrace.com/wp-content/uploads/2022/07/COVER-3-1000x500.jpg",
//     "calorieBurn": "18",
//     "focusZones": "Back",
//     "category": "Advanced",
//     "workoutId": "670df791a5224bc4ccd7699d"
//   }

export const createReminder = async (req, res) => {
  const userId = req.user._id;
  const { updates } = req.body;

  console.log(updates);

  const createDateFromTimeString = (timeString) => {
    if (timeString && !isNaN(new Date(timeString).getTime())) {
      return new Date(timeString);
    }

    const [hours, minutes] = timeString.split(":");
    const now = new Date(); // Current date
    now.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Set time but keep current date

    // If the time has already passed today, set the reminder for the next day
    if (now < new Date()) {
      now.setDate(now.getDate() + 1); // Move reminder to next day if time has passed
    }

    return now;
  };

  try {
    // Convert time strings to Date objects
    if (updates.exerciseReminder?.time) {
      updates.exerciseReminder.time = createDateFromTimeString(
        updates.exerciseReminder.time
      );
    }
    if (updates.fastingReminder?.time) {
      updates.fastingReminder.time = createDateFromTimeString(
        updates.fastingReminder.time
      );
    }
    if (updates.mealReminders) {
      for (let meal in updates.mealReminders) {
        if (updates.mealReminders[meal]?.time) {
          updates.mealReminders[meal].time = createDateFromTimeString(
            updates.mealReminders[meal].time
          );
        }
      }
    }

    // Update or create the reminder in the database
    const reminder = await Reminder.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true, upsert: true }
    );

    console.log("Reminder created or updated:", reminder);

    // Send the updated reminder back as a response
    res.status(200).json(reminder);
  } catch (error) {
    console.error("Error creating/updating reminder:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getUsersReminder = async (req, res) => {
  const userId = req.user._id;

  try {
    const reminder = await Reminder.findOne({ userId });

    if (!reminder) throw new Error("Reminder setting not found!");

    res.status(200).json(reminder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
