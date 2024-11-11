import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true,
  },
});

export const Food = mongoose.model("Food", foodSchema);
export default Food;
