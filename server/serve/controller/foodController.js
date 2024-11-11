import mongoose from "mongoose";
import Food from "../models/FoodItem.js";

export const createFoodController = async (req, res) => {
  try {
    const { name, calories, carbs, fats, protein, barcode } = req.body;

    const newFood = new Food({
      name,
      calories,
      carbs,
      fats,
      protein,
      barcode,
    });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(400).json({ message: "Failed to create food", error });
  }
};

export const getFoodController = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ message: "Failed to fetch foods", error });
  }
};

export const getFoodByBarCode = async (req, res) => {
  try {
    const { barcode } = req.params;

    console.log(barcode);

    const food = await Food.findOne({ barcode });
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(food);
  } catch (error) {
    console.error("Error fetching food by barcode:", error);
    res.status(500).json({ message: "Failed to fetch food", error });
  }
};
