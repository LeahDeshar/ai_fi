// const populatePastActivities = async (userId) => {
//   try {
//     const today = new Date();

//     // Loop for each day in the past 30 days
//     for (let i = 0; i < 30; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() - i);

//       const startOfDay = new Date(date.setHours(0, 0, 0, 0));
//       const endOfDay = new Date(date.setHours(23, 59, 59, 999));

//       // Check if activity exists for this date
//       const activityExists = await UserActivity.findOne({
//         userId: userId,
//         date: { $gte: startOfDay, $lte: endOfDay },
//       });

//       if (!activityExists) {
//         // Fetch the user's current fasting settings
//         const fastingSchedule = await FastingSchedule.findOne({
//           user: userId,
//           isActive: true,
//         });

//         if (!fastingSchedule) {
//           throw new Error("Active fasting schedule not found for user");
//         }

//         const { fastingHours, eatingHours, startTime } = fastingSchedule;
//         const fastingEndTime = new Date(
//           startTime.getTime() + fastingHours * 60 * 60 * 1000
//         );

//         // Create mock data for activity
//         const mockWaterIntake = Math.floor(Math.random() * 3000) + 500; // Random intake in ml
//         const mockCalorieIntake = Math.floor(Math.random() * 2500) + 1000; // Random intake in kcal
//         const mockSleepDuration = Math.floor(Math.random() * 5) + 5; // Random sleep in hours
//         const mockDailySteps = Math.floor(Math.random() * 10000) + 2000; // Random steps

//         // Create a new activity for this day with the user's current fasting settings
//         const newActivity = new UserActivity({
//           userId: userId,
//           date: startOfDay,
//           waterIntake: mockWaterIntake,
//           calorieIntake: mockCalorieIntake,
//           sleepDuration: mockSleepDuration,
//           dailySteps: mockDailySteps,
//           fastingOption: `${fastingHours}:${eatingHours}`,
//           fastingStartTime: startTime,
//           fastingEndTime: fastingEndTime,
//           isFastingAdhered: Math.random() > 0.2, // Random adherence with 80% probability
//           fastingDeviation:
//             Math.random() > 0.8 ? Math.floor(Math.random() * 2) : 0, // Random deviation with 20% chance
//         });

//         await newActivity.save();
//         console.log(
//           `Created mock activity for user ${userId} on ${startOfDay}`
//         );
//       } else {
//         console.log(
//           `Activity for user ${userId} already exists on ${startOfDay}`
//         );
//       }
//     }

//     console.log("Mock data for past 30 days created successfully.");
//   } catch (error) {
//     console.error("Error populating past activities:", error);
//   }
// };

// populatePastActivities("67189a704f4eed52a1cfb7ae");

// const generateMockData = async (userId) => {
//   const startDate = moment().subtract(1, "years"); // One year ago
//   const endDate = moment(); // Today

//   let dailyData = [];
//   let weeklyData = [];
//   let currentWeekStart = startDate.clone();
//   let currentWeekEnd = currentWeekStart.clone().endOf("week");

//   for (
//     let date = startDate.clone();
//     date.isBefore(endDate);
//     date.add(1, "days")
//   ) {
//     // Generate random mock data for daily activity
//     const waterIntake = Math.floor(Math.random() * 4000 + 1000); // Random between 1000ml to 5000ml
//     const calorieIntake = Math.floor(Math.random() * 2500 + 1500); // Random between 1500 to 4000 calories
//     const sleepDuration = Math.floor(Math.random() * 3 + 5); // Random between 5 to 8 hours
//     const steps = Math.floor(Math.random() * 12000 + 2000); // Random between 2000 to 14000 steps

//     const activity = new UserActivity({
//       userId,
//       date: date.toDate(),
//       waterIntake,
//       calorieIntake,
//       sleepDuration,
//       dailySteps: steps,
//       fastingOption: "16:8", // Example fasting option, can be more dynamic
//     });

//     dailyData.push(activity);

//     // Check if the date belongs to the current week for weekly summary
//     if (date.isSameOrAfter(currentWeekStart) && date.isBefore(currentWeekEnd)) {
//       weeklyData.push({ waterIntake, calorieIntake, sleepDuration, steps });
//     }

//     // At the end of the week, aggregate data into WeeklySummary
//     if (date.isSameOrAfter(currentWeekEnd)) {
//       const weeklySummary = new WeeklySummary({
//         userId,
//         startDate: currentWeekStart.toDate(),
//         endDate: currentWeekEnd.toDate(),
//         totalWaterIntake: weeklyData.reduce(
//           (acc, val) => acc + val.waterIntake,
//           0
//         ),
//         totalCalorieIntake: weeklyData.reduce(
//           (acc, val) => acc + val.calorieIntake,
//           0
//         ),
//         averageSleepDuration:
//           weeklyData.reduce((acc, val) => acc + val.sleepDuration, 0) /
//           weeklyData.length,
//         totalDailySteps: weeklyData.reduce((acc, val) => acc + val.steps, 0),
//       });

//       await weeklySummary.save();
//       // Reset weekly data for next week
//       currentWeekStart = currentWeekStart.add(1, "week");
//       currentWeekEnd = currentWeekStart.clone().endOf("week");
//       weeklyData = [];
//     }
//   }

//   // Save daily data to the database
//   await UserActivity.insertMany(dailyData);
// };

// generateMockData("67189a704f4eed52a1cfb7ae");

// CREATE MOCK DATA FOR MEALS

// const userId = "67189a704f4eed52a1cfb7ae"; // example user ID
// const foodIds = [
//   "6732508541f5c8671a50e74a",
//   "6732508541f5c8671a50e74d",
//   "6732508541f5c8671a50e74e",
//   "6732508541f5c8671a50e74f",
// ]; // Replace with real Food _id values from your database

// async function createMockMeals() {
//   // Define two past dates
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(today.getDate() - 1);

//   const meals = [
//     {
//       userId,
//       mealType: "Breakfast",
//       foods: [foodIds[0], foodIds[1]],
//       date: yesterday,
//     },
//     {
//       userId,
//       mealType: "Lunch",
//       foods: [foodIds[2]],
//       date: yesterday,
//     },
//     {
//       userId,
//       mealType: "Dinner",
//       foods: [foodIds[3], foodIds[1]],
//       date: yesterday,
//     },
//     {
//       userId,
//       mealType: "Breakfast",
//       foods: [foodIds[0]],
//       date: today,
//     },
//     {
//       userId,
//       mealType: "Lunch",
//       foods: [foodIds[2], foodIds[3]],
//       date: today,
//     },
//     {
//       userId,
//       mealType: "Snacks",
//       foods: [foodIds[1]],
//       date: today,
//     },
//   ];

//   try {
//     // Insert mock meals
//     await Meal.insertMany(meals);
//     console.log("Mock data for meals has been created.");
//   } catch (error) {
//     console.error("Error creating mock data:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// createMockMeals();

// CREATE ACTIVITY OF USER

// const userId = "67189a704f4eed52a1cfb7ae";

// async function createMockData() {
//   try {
//     // Create dates for Sunday and Monday
//     const today = new Date();
//     const tuesday = today.getDate();
//     const monday = new Date(today);
//     monday.setDate(tuesday - 1); // Yesterday (Monday)
//     const sunday = new Date(today);
//     sunday.setDate(tuesday - 2); // Two days ago (Sunday)

//     // Set time to beginning of the day
//     monday.setHours(0, 0, 0, 0);
//     sunday.setHours(0, 0, 0, 0);

//     // Mock data for Sunday
//     const sundayActivity = new UserActivity({
//       userId,
//       date: sunday,
//       waterIntake: 2100,
//       calorieIntake: 1800,
//       sleepDuration: 7,
//       dailySteps: 12000,
//       fastingOption: "16:8",
//       fastingStartTime: new Date(sunday.setHours(20, 0, 0)), // Example start at 8 PM
//       fastingEndTime: new Date(sunday.setHours(20, 0, 0) + 16 * 60 * 60 * 1000), // End after 16 hours
//       isFastingAdhered: true,
//       fastingDeviation: 0,
//     });

//     // Mock data for Monday
//     const mondayActivity = new UserActivity({
//       userId,
//       date: monday,
//       waterIntake: 1700,
//       calorieIntake: 2000,
//       sleepDuration: 6,
//       dailySteps: 14000,
//       fastingOption: "16:8",
//       fastingStartTime: new Date(monday.setHours(20, 0, 0)), // Example start at 8 PM
//       fastingEndTime: new Date(monday.setHours(20, 0, 0) + 16 * 60 * 60 * 1000), // End after 16 hours
//       isFastingAdhered: true,
//       fastingDeviation: 0,
//     });

//     // Save both activities to the database
//     await sundayActivity.save();
//     await mondayActivity.save();

//     console.log("Mock data for Sunday and Monday created successfully.");
//   } catch (error) {
//     console.error("Error creating mock data:", error);
//   }
// }

// Call the function to create mock data
// createMockData();

// YT SEEDING
// const seedData = async () => {
//     try {
//       const dataPath = path.join("./db", "YT.json"); // Update with the correct path to your YT.json
//       const fileContent = fs.readFileSync(dataPath, "utf8");
//       const jsonData = JSON.parse(fileContent);

//       // Insert the data into MongoDB
//       // const result = await YTmodel.insertMany(jsonData);
//       const mappedData = jsonData.map((video) => ({
//         video_id: video.video_id,
//         title: video.title,
//         channelTitle: video.channelTitle,
//         Publish_date: video.Publish_date,
//         Publish_time: video.Publish_time,
//         tags: video.tags,
//         viewCount: video.viewCount || 0,
//         likeCount: video.likeCount || 0,
//         duration: video.duration || "",
//       }));
//       // const result = await YTmodel.insertMany(mappedData);

//       console.log(`Preparing to insert ${mappedData.length} records...`);

//       // Optional: Use batch insertion to prevent timeouts
//       const batchSize = 500;
//       for (let i = 0; i < mappedData.length; i += batchSize) {
//         const batch = mappedData.slice(i, i + batchSize);
//         try {
//           const result = await YTmodel.insertMany(batch, {
//             writeConcern: { w: "majority", j: true },
//             timeout: 0,
//           });
//           console.log(`Inserted batch ${i / batchSize + 1}`);
//         } catch (error) {
//           console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
//         }
//       }
//       console.log(`Successfully seeded  records into the database.`);

//       // Close MongoDB connection
//       mongoose.connection.close();
//     } catch (error) {
//       console.error("Error seeding data:", error);
//       mongoose.connection.close();
//     }
//   };

// Run the seed function
// seedData();
