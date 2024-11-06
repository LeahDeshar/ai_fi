// import mongoose from "mongoose";
// daily activity tracking

// const activitySchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Users",
//     required: true,
//   },
//   date: { type: Date, required: true },
//   waterIntake: { type: Number, required: true },
//   calorieIntake: { type: Number, required: true },
//   sleepDuration: { type: Number, required: true },
//   dailySteps: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },

//   fastingOption: { type: String, required: true },
//   fastingStartTime: { type: Date, required: true },
//   fastingEndTime: { type: Date, required: true },
//   isFastingAdhered: { type: Boolean, default: false },
//   fastingDeviation: {
//     type: Number,
//     default: 0,
//     description: "Deviation in hours from fasting schedule",
//   },
// });

// const UserActivity = mongoose.model("UserActivity", activitySchema);

// export default UserActivity;

import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    waterIntake: {
      type: Number,
      required: true,
      default: 0,
    },
    calorieIntake: {
      type: Number,
      required: true,
      default: 0,
    },
    sleepDuration: {
      type: Number,
      required: true,
      default: 0,
    },
    dailySteps: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    fastingOption: {
      type: String,
      required: true,
      enum: [
        "16:8",
        "17:7",
        "18:6",
        "19:5",
        "20:4",
        "21:3",
        "22:2",
        "23:1",
        "12:12",
        "13:11",
        "14:10",
        "15:9",
      ],
      default: "16:8",
    },
    fastingStartTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    fastingEndTime: {
      type: Date,
      required: true,
      default: function () {
        const fastingHours = this.fastingOption.split(":")[0];
        const endTime =
          new Date(this.fastingStartTime).getTime() +
          fastingHours * 60 * 60 * 1000;
        return new Date(endTime);
      },
    },
    isFastingAdhered: {
      type: Boolean,
      default: false,
    },
    fastingDeviation: {
      type: Number,
      default: 0,
      description: "Deviation in hours from fasting schedule",
    },
  },
  {
    timestamps: true,
  }
);

const UserActivity = mongoose.model("UserActivity", activitySchema);

export default UserActivity;
