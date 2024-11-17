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

// export const createReminder = async (req, res) => {
//   const userId = req.user._id;
//   const { updates } = req.body;

//   const createDateFromTimeString = (timeString) => {
//     // Check if timeString is already a valid Date string
//     if (timeString && !isNaN(new Date(timeString).getTime())) {
//       return new Date(timeString); // If it's a valid ISO string, directly return it as a Date
//     }
//     // If not a valid Date string, proceed to extract time (only if needed)
//     const [hours, minutes] = timeString.split(":");
//     const now = new Date(); // Get current date
//     now.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Set time but keep current date
//     return now;
//   };

//   try {
//     // Convert time strings to Date objects if not already valid Date strings
//     if (updates.exerciseReminder?.time) {
//       updates.exerciseReminder.time = createDateFromTimeString(
//         updates.exerciseReminder.time
//       );
//     }
//     if (updates.fastingReminder?.time) {
//       updates.fastingReminder.time = createDateFromTimeString(
//         updates.fastingReminder.time
//       );
//     }
//     if (updates.mealReminders) {
//       for (let meal in updates.mealReminders) {
//         if (updates.mealReminders[meal]?.time) {
//           updates.mealReminders[meal].time = createDateFromTimeString(
//             updates.mealReminders[meal].time
//           );
//         }
//       }
//     }

//     // Update or create the reminder
//     const reminder = await Reminder.findOneAndUpdate(
//       { userId },
//       { $set: updates },
//       { new: true, upsert: true }
//     );

//     console.log("Reminder created or updated:", reminder);

//     // Send the updated reminder back as response
//     res.status(200).json(reminder);
//   } catch (error) {
//     console.error("Error creating/updating reminder:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

export const createReminder = async (req, res) => {
  const userId = req.user._id;
  const { updates } = req.body;

  console.log(updates);

  // Helper function to create a Date object from a time string
  const createDateFromTimeString = (timeString) => {
    if (timeString && !isNaN(new Date(timeString).getTime())) {
      return new Date(timeString); // If it's a valid ISO string, return as Date
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

// export const createReminder = async (req, res) => {
//   const userId = req.user._id;
//   const { updates } = req.body;

//   const createDateFromTimeString = (timeString) => {
//     const [hours, minutes] = timeString.split(":");
//     const now = new Date(); // Get current date
//     now.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Set time but keep current date
//     return now;
//   };

//   try {
//     // Convert time strings to Date objects
//     if (updates.exerciseReminder?.time) {
//       updates.exerciseReminder.time = createDateFromTimeString(
//         updates.exerciseReminder.time
//       );
//     }
//     if (updates.fastingReminder?.time) {
//       updates.fastingReminder.time = createDateFromTimeString(
//         updates.fastingReminder.time
//       );
//     }
//     if (updates.mealReminders) {
//       for (let meal in updates.mealReminders) {
//         if (updates.mealReminders[meal]?.time) {
//           updates.mealReminders[meal].time = createDateFromTimeString(
//             updates.mealReminders[meal].time
//           );
//         }
//       }
//     }

//     // Update or create the reminder
//     const reminder = await Reminder.findOneAndUpdate(
//       { userId },
//       { $set: updates },
//       { new: true, upsert: true }
//     );

//     console.log("Reminder created or updated:", reminder);

//     // Send the updated reminder back as response
//     res.status(200).json(reminder);
//   } catch (error) {
//     console.error("Error creating/updating reminder:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// import moment from "moment";

// export const createReminder = async (req, res) => {
//   const userId = req.user._id;
//   const { updates } = req.body;
//   console.log(updates);

//   try {
//     // Validate and format time fields
//     const formattedUpdates = { ...updates };

//     if (updates.exerciseReminder?.time) {
//       formattedUpdates.exerciseReminder.time = moment(
//         updates.exerciseReminder.time,
//         "HH:mm"
//       ).format("HH:mm");
//     }

//     if (updates.fastingReminder?.time) {
//       formattedUpdates.fastingReminder.time = moment(
//         updates.fastingReminder.time,
//         "HH:mm"
//       ).format("HH:mm");
//     }

//     if (updates.mealReminders) {
//       formattedUpdates.mealReminders = { ...updates.mealReminders };

//       for (const [meal, reminder] of Object.entries(updates.mealReminders)) {
//         if (reminder.time) {
//           formattedUpdates.mealReminders[meal].time = moment(
//             reminder.time,
//             "HH:mm"
//           ).format("HH:mm");
//         }
//       }
//     }

//     // Find and update the reminder document
//     const reminder = await Reminder.findOneAndUpdate(
//       { userId },
//       { $set: formattedUpdates },
//       { new: true, upsert: true }
//     );

//     console.log("Reminder created or updated:", reminder);

//     res.status(200).json(reminder);
//   } catch (error) {
//     console.error("Error creating or updating reminder:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

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
