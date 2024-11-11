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
  },
  fats: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true,
  },
});

export const Food = mongoose.model("Food", foodSchema);
export default Food;
