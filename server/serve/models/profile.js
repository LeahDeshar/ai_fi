import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "coach"],
    default: "user",
  },
  experience: {
    type: Number,
    required: function () {
      return this.role === "coach";
    },
  },
  category: {
    type: [String],
    enum: [
      "HIIT & CONDITIONING",
      "NUTRITION",
      "STRENGTH",
      "MUSCLE BUILDING",
      "YOGA",
      "WEIGHT LIFTING",
      "CARDIO",
    ],
    required: function () {
      return this.role === "coach";
    },
  },
  rating: {
    type: Number,
    required: function () {
      return this.role === "coach";
    },
  },
  birthday: {
    type: Date,
    required: true,
  },

  preferredUnits: {
    type: String,
    enum: ["metric", "imperial"],
    default: "metric",
  },

  currentHeight: {
    centimeters: {
      type: Number,
      min: 30,
      required: function () {
        return this.preferredUnits === "metric";
      },
    },
    feet: {
      type: Number,
      min: 0,
      max: 8,
      required: function () {
        return this.preferredUnits === "imperial";
      },
    },
    inches: {
      type: Number,
      min: 0,
      max: 11,
      required: function () {
        return this.preferredUnits === "imperial";
      },
    },
  },

  currentWeight: {
    kilograms: {
      type: Number,
      required: function () {
        return this.preferredUnits === "metric";
      },
    },
    pounds: {
      type: Number,
      required: function () {
        return this.preferredUnits === "imperial";
      },
    },
  },

  goalWeight: {
    kilograms: {
      type: Number,
      required: function () {
        return this.preferredUnits === "metric";
      },
    },
    pounds: {
      type: Number,
      required: function () {
        return this.preferredUnits === "imperial";
      },
    },
  },

  activityLevel: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    required: [true, "Please enter your activity level (0-100)"],
  },

  activitiesLiked: {
    type: [String],
    enum: ["Fitness at Home", "Somatic", "Walking", "Stretching", "Yoga"],
    required: function () {
      return this.role === "user";
    },
  },

  specialPrograms: {
    type: [String],
    enum: [
      "No Thanks",

      "Sensitive Back",

      "Sensitive Knees",

      "Limited Mobility",

      "Limb Loss",

      "Prenatal",

      "Postnatal",
    ],
    default: [],
  },

  dailySteps: {
    type: Number,
    default: 0,
  },

  dailyStepRecommendation: {
    type: String,
    default: "No recommendation yet",
  },

  preferredDietType: {
    type: String,
    enum: [
      "Vegan",
      "Traditional",
      "Vegetarian",
      "Paleo",
      "Low Carb",
      "Keto",
      "Balanced",
      "Other",
    ],
    default: "Balanced",
  },

  profilePic: {
    public_id: {
      type: String,
      default: "default_public_id",
    },
    url: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=",
    },
  },
});

// Helper function to convert height and weight based on preferred units
profileSchema.methods.convertHeightToMetric = function () {
  if (this.preferredUnits === "imperial") {
    const totalInches =
      this.currentHeight.feet * 12 + this.currentHeight.inches;
    return totalInches * 2.54; // Convert inches to centimeters
  }
  return this.currentHeight.centimeters; // Already in metric
};

profileSchema.methods.convertWeightToMetric = function () {
  if (this.preferredUnits === "imperial") {
    return this.currentWeight.pounds * 0.453592; // Convert pounds to kilograms
  }
  return this.currentWeight.kilograms; // Already in metric
};

// BMI calculation based on preferred units
profileSchema.methods.calculateBMI = function () {
  const heightInCm = this.convertHeightToMetric();
  const weightInKg = this.convertWeightToMetric();
  const heightInMeters = heightInCm / 100;
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  return parseFloat(bmi.toFixed(2));
};

// Water intake calculation based on preferred units
profileSchema.methods.calculateWaterIntake = function () {
  let weightInKg = this.convertWeightToMetric();
  const weightInPounds = weightInKg * 2.20462; // Convert to pounds for water intake formula
  const waterIntakeInOunces = weightInPounds * 0.5; // Water intake formula
  const waterIntakeInLiters = waterIntakeInOunces * 0.0295735; // Convert ounces to liters
  return parseFloat(waterIntakeInLiters.toFixed(2));
};

// Recommend daily steps based on BMI
profileSchema.methods.recommendDailySteps = function () {
  const bmi = this.calculateBMI();
  let recommendation;
  if (bmi < 18.5) {
    recommendation = "8,000 steps";
  } else if (bmi < 24.9) {
    recommendation = "10,000 steps";
  } else if (bmi < 29.9) {
    recommendation = "12,000 steps";
  } else {
    recommendation = "15,000 steps";
  }
  this.dailyStepRecommendation = recommendation;
  return recommendation;
};
profileSchema.methods.calculateWeightLossDuration = function () {
  const gender = this.gender;
  const age = new Date().getFullYear() - this.birthday.getFullYear();
  const heightCm = this.currentHeight.centimeters
    ? this.currentHeight.centimeters
    : this.currentHeight.feet * 30.48 + this.currentHeight.inches * 2.54;
  const currentWeight =
    this.currentWeight.kilograms || this.currentWeight.pounds / 2.20462; // Convert pounds to kg if needed
  const goalWeight =
    this.goalWeight.kilograms || this.goalWeight.pounds / 2.20462; // Convert pounds to kg if needed
  const activityLevel = this.activityLevel;

  // Calculate BMR using Mifflin-St Jeor Equation
  let BMR;
  if (gender === "male") {
    BMR = 10 * currentWeight + 6.25 * heightCm - 5 * age + 5;
  } else {
    BMR = 10 * currentWeight + 6.25 * heightCm - 5 * age - 161;
  }

  // Adjust for activity level
  let activityFactor;
  if (activityLevel < 20) activityFactor = 1.2;
  else if (activityLevel < 40) activityFactor = 1.375;
  else if (activityLevel < 60) activityFactor = 1.55;
  else if (activityLevel < 80) activityFactor = 1.725;
  else activityFactor = 1.9;

  let dailyCalorieNeeds = BMR * activityFactor;

  // Calculate weight to lose
  let weightToLose = currentWeight - goalWeight;
  let weightToLoseInPounds = weightToLose * 2.20462;

  // Estimate time required (healthy loss of 0.5 to 1 kg per week)
  let minWeeks = weightToLose / 1; // Max loss of 1 kg per week
  let maxWeeks = weightToLose / 0.5; // Min loss of 0.5 kg per week

  // Calorie deficit to lose weight (500-1000 calorie deficit per day for healthy weight loss)
  let startCalories = dailyCalorieNeeds;
  let targetCalories = dailyCalorieNeeds - 500;

  // Calculate months from weeks
  const minMonths = minWeeks / 4;
  const maxMonths = maxWeeks / 4;

  // Return the calculated weight loss duration and recommended calorie intake
  return {
    weeks: {
      minWeeks: Math.ceil(minWeeks),
      maxWeeks: Math.ceil(maxWeeks),
    },
    months: {
      minMonths: Math.ceil(minMonths),
      maxMonths: Math.ceil(maxMonths),
    },
    calories: {
      startCalories: startCalories.toFixed(1),
      targetCalories: targetCalories.toFixed(1),
    },
  };
};

export const profileModel = mongoose.model("Profile", profileSchema);
export default profileModel;
