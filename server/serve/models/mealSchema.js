import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snacks"],
    required: true,
  },
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Meal = mongoose.model("Meal", mealSchema);
export default Meal;
