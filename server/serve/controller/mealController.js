import mongoose from "mongoose";
import Meal from "../models/mealSchema.js";
import moment from "moment";

export const createMeal = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mealType, foodId } = req.body;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let meal = await Meal.findOne({
      userId: userId,
      mealType,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (meal) {
      console.log("Meal found");
      const foods = new mongoose.Types.ObjectId(foodId);

      meal.foods.push(foods);
      await meal.save();
      return res.status(200).json(meal);
    } else {
      console.log("No meal ");
      meal = new Meal({
        userId,
        mealType,
        foods: foodId,
      });
      await meal.save();
      return res.status(201).json(meal);
    }
  } catch (error) {
    console.error("Error creating or updating meal:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// get all the meal of user of the picked date

export const getMealsByDate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { date } = req.params;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate("foods");

    if (meals.length === 0) {
      return res.status(404).json({ message: "No meals found for this date" });
    }

    let totalCalories = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalProtein = 0;

    const categorizedMeals = {};

    meals.forEach((meal) => {
      let mealCalories = 0;

      if (!categorizedMeals[meal.mealType]) {
        categorizedMeals[meal.mealType] = { totalCalories: 0, foods: [] };
      }

      meal.foods.forEach((food) => {
        totalCalories += food.calories;
        totalCarbs += food.carbs;
        totalFats += food.fats;
        totalProtein += food.protein;

        mealCalories += food.calories;
        categorizedMeals[meal.mealType].foods.push(food);
      });

      // Update the total calories for the meal type
      categorizedMeals[meal.mealType].totalCalories += mealCalories;
    });

    // Send the aggregated data as the response
    return res.status(200).json({
      totalCalories,
      totalCarbs,
      totalFats,
      totalProtein,
      categorizedMeals,
    });
  } catch (error) {
    console.error("Error fetching meals by date:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllMeals = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get start and end of the current day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch meals for the current day
    const meals = await Meal.find({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate("foods");
    const categorizedMeals = meals.reduce((acc, meal) => {
      if (!acc[meal.mealType]) {
        acc[meal.mealType] = { meals: [], totalCalories: 0 };
      }

      // Calculate total calories for this meal
      const totalCaloriesForMeal = meal.foods.reduce((total, food) => {
        return total + (food.calories || 0); // Add food calories (or 0 if not available)
      }, 0);

      // Add meal and total calories to the categorized meal
      acc[meal.mealType].meals.push(meal);
      acc[meal.mealType].totalCalories += totalCaloriesForMeal;

      return acc;
    }, {});

    console.log(categorizedMeals);

    return res.status(200).json(categorizedMeals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getDailyConsumption = async (req, res) => {
  try {
    const userId = req.user._id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate("foods");
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalProtein = 0;

    meals.forEach((meal) => {
      meal.foods.forEach((food) => {
        totalCalories += food.calories || 0;
        totalCarbs += food.carbs || 0;
        totalFat += food.fats || 0;
        totalProtein += food.protein || 0;
      });
    });

    // Send response with total nutrient consumption
    return res.status(200).json({
      totalCalories,
      totalCarbs,
      totalFat,
      totalProtein,
    });
  } catch (error) {
    console.error("Error fetching daily consumption:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate("foods");

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    return res.status(200).json(meal);
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMealsByMealType = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mealType } = req.params;

    const todayStart = moment().startOf("day").toDate();
    const todayEnd = moment().endOf("day").toDate();
    console.log(mealType, todayStart, todayEnd);

    const meals = await Meal.find({
      userId,
      mealType: mealType,
      date: { $gte: todayStart, $lte: todayEnd },
    }).populate("foods");
    console.log(meals);
    if (meals.length === 0) {
      return res
        .status(404)
        .json({ message: `No meals found for ${mealType} today` });
    }

    return res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching meals by meal type and date:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const updateMeal = async (req, res) => {
  try {
    const { mealType, foods, date } = req.body;
    const mealId = req.params.id;

    const meal = await Meal.findById(mealId);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    if (mealType) meal.mealType = mealType;
    if (foods) meal.foods = foods;
    if (date) meal.date = date;

    await meal.save();
    return res.status(200).json(meal);
  } catch (error) {
    console.error("Error updating meal:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const mealId = req.params.id;

    const meal = await Meal.findById(mealId);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    await meal.remove();
    return res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
