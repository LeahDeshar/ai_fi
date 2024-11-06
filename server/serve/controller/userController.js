import Users from "../models/user.js";
import Profile from "../models/profile.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../util/features.js";
import { client } from "../util/redis.js";
import FastingSchedule from "../models/FastingScheduleSchema.js";

export const registerController = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    console.log(req.body);

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({
        msg: "Fill all the fields",
        success: false,
      });
    }

    const findEmail = await Users.findOne({ email: email });
    if (findEmail) {
      return res.status(400).json({
        msg: "Email already exist",
        success: false,
      });
    }

    const user = await Users.create({
      email,
      password,
    });
    const token = user.generateJWT();
    if (!user) {
      return res.status(400).json({
        msg: "Something went wrong",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "User created successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Internal Error (register)",
      success: false,
      error,
    });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // login validation
    if (!email || !password) {
      return res.status(400).json({
        msg: "Fill all the fields",
        success: false,
      });
    }
    // check if email exist
    let user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Email does not exist",
        success: false,
      });
    }
    // check if password is correct
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Incorrect password",
        success: false,
      });
    }

    const token = user.generateJWT();
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        secure: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      })
      .json({
        msg: "Login successfully",
        success: true,
        user,
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Internal Error (login)",
      success: false,
      error,
    });
  }
};
export const logoutController = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        secure: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      })
      .json({
        msg: "Logout successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error (logout)",
      success: false,
      error,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      return res.status(400).json({
        msg: "Fill all the fields",
        success: false,
      });
    }
    const user = await Users.findOne({ email, answer });
    if (!user) {
      return res.status(400).json({
        msg: "Email does not exist",
        success: false,
      });
    }
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      msg: "Password Reset",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error (reset password)",
      success: false,
      error,
    });
  }
};
// update user password
export const passUpdateController = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    const { password, newPassword } = req.body;
    // update validation
    if (!password || !newPassword) {
      return res.status(400).json({
        msg: "Fill all the fields",
        success: false,
      });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Incorrect password",
        success: false,
      });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      msg: "Password updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error (password update)",
      success: false,
      error,
    });
  }
};

export const accountDeleteController = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    const profile = await Profile.findOne({ user: user.profile });

    if (profile) {
      await Profile.deleteOne({ _id: profile._id });
    }

    // Delete the user account
    await Users.deleteOne({ _id: req.user._id });

    return res.status(200).json({
      msg: "Account deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in accountDeleteController:", error);
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
/**************PROFILE CONTROLLER*****************/
export const createUserProfileController = async (req, res) => {
  try {
    const {
      name,
      gender,
      birthday,
      currentHeight,
      currentWeight,
      goalWeight,
      activityLevel,
      activitiesLiked,
      specialPrograms,
      dailySteps,
      preferredDietType,
      preferredUnits,
      experience,
      rating,
      category,
      role,
    } = req.body;

    const userId = req.user._id;

    const startTime = new Date();
    const fastingHours = 16;
    const eatingHours = 24 - fastingHours;

    const endTime = new Date(
      startTime.getTime() + fastingHours * 60 * 60 * 1000
    );

    const fastingSchedule = new FastingSchedule({
      user: userId,
      startTime,
      endTime,
      fastingHours,
      eatingHours,
    });

    await fastingSchedule.save();

    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Profile already exists for this user." });
    }
    console.log(req.body);

    // Handle height parsing based on preferred units
    let heightData;
    if (typeof currentHeight === "string") {
      try {
        heightData = JSON.parse(currentHeight);
        console.log(heightData);
      } catch (error) {
        console.error("JSON parsing error:", error);
        return res.status(400).json({ message: "Invalid height format." });
      }
    } else {
      heightData = currentHeight;
    }

    let heightInCm = 0;
    if (preferredUnits === "imperial") {
      if (heightData.feet !== undefined && heightData.inches !== undefined) {
        heightInCm = heightData.feet * 30.48 + heightData.inches * 2.54;
      } else {
        return res.status(400).json({
          message: "Imperial height must include both feet and inches.",
        });
      }
    } else if (preferredUnits === "metric") {
      if (heightData.centimeters !== undefined) {
        heightInCm = heightData.centimeters;
      } else {
        return res
          .status(400)
          .json({ message: "Metric height must be provided in centimeters." });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Preferred units must be provided." });
    }
    console.log("here");
    let weightData;
    if (typeof currentWeight === "string") {
      try {
        weightData = JSON.parse(currentWeight);
      } catch (error) {
        console.error("JSON parsing error:", error);
        return res.status(400).json({ message: "Invalid weight format." });
      }
    } else {
      weightData = currentWeight;
    }

    let weightTarData;
    if (typeof goalWeight === "string") {
      try {
        weightTarData = JSON.parse(goalWeight);
      } catch (error) {
        console.error("JSON parsing error:", error);
        return res.status(400).json({ message: "Invalid goalWeight format." });
      }
    } else {
      weightTarData = goalWeight;
    }

    console.log(weightData, weightTarData);
    // Handle weight conversion based on preferred units
    let weightInKg = 0;
    if (preferredUnits === "imperial") {
      weightInKg = weightData.pounds * 0.453592; // Convert lbs to kg
    } else if (preferredUnits === "metric") {
      weightInKg = weightData.kilograms;
    } else {
      return res
        .status(400)
        .json({ message: "Weight must be provided correctly." });
    }

    let goalWeightInKg = 0;
    if (preferredUnits === "imperial") {
      goalWeightInKg = weightTarData.pounds * 0.453592; // Convert lbs to kg
    } else if (preferredUnits === "metric") {
      goalWeightInKg = weightTarData.kilogams;
    } else {
      return res
        .status(400)
        .json({ message: "Goal weight must be provided correctly." });
    }

    // Handle profile picture upload
    let profilePicData = {};
    console.log("profile", req.file);
    const file = getDataUri(req.file);
    if (file) {
      const result = await cloudinary.v2.uploader.upload(file.content);
      profilePicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    let parsedCategory;
    if (category) {
      parsedCategory = JSON.parse(category);
    }

    console.log(parsedCategory);
    let parsedLikedActivities = JSON.parse(activitiesLiked);

    // Create new profile
    const newProfile = new Profile({
      user: userId,
      name,
      gender,
      birthday,
      preferredUnits,
      currentHeight:
        preferredUnits === "imperial"
          ? { feet: heightData.feet, inches: heightData.inches }
          : { centimeters: heightInCm },
      currentWeight:
        preferredUnits === "imperial"
          ? { pounds: weightData.pounds }
          : { kilograms: weightData.kilograms },
      goalWeight:
        preferredUnits === "imperial"
          ? { pounds: weightTarData.pounds }
          : { kilograms: weightTarData.kilograms },
      activityLevel,
      activitiesLiked: parsedLikedActivities,
      specialPrograms,
      dailySteps,
      preferredDietType,
      profilePic: profilePicData,
      experience,
      rating,
      category: parsedCategory,
      role,
    });

    // Save new profile
    await newProfile.save();

    // Link profile to user
    await Users.findByIdAndUpdate(userId, { profile: newProfile._id });

    // Recommend daily steps based on BMI and update profile
    newProfile.recommendDailySteps();
    await newProfile.save();

    res
      .status(201)
      .json({ message: "Profile created successfully", profile: newProfile });
  } catch (error) {
    console.error("Error in createUserProfileController:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// export const getUserProfileController = async (req, res) => {
//   try {
//     const user = await Users.findById(req.user._id).select("-password");

//     console.log(user);

//     const profileOfUsers = await Profile.findById(user.profile);
//     const bmi = profileOfUsers.calculateBMI();
//     const waterIntake = profileOfUsers.calculateWaterIntake();
//     const dailyStepRecommendation = profileOfUsers.recommendDailySteps();

//     res.status(200).json({
//       success: true,
//       message: "User profile fetched successfully",
//       profileOfUsers,
//       calculations: {
//         bmi,
//         waterIntake,
//         dailyStepRecommendation,
//         weightLossDuration: profileOfUsers.calculateWeightLossDuration(),
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "User profile fetched failed",
//     });
//   }
// };

// // get all user if the user.role == "coach"
// export const getAllCoachController = async (req, res) => {
//   try {
//     const users = await Profile.find({ role: "coach" }).select("-password");
//     return res.status(200).json({
//       msg: "All users fetched successfully",
//       success: true,
//       users,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       msg: "Internal Error (get all users)",
//       success: false,
//       error,
//     });
//   }
// };

export const getUserProfileController = async (req, res) => {
  try {
    const cacheKey = `userProfile:${req.user._id}`;
    const cachedProfile = await client.get(cacheKey);
    if (cachedProfile) {
      const profileData = JSON.parse(cachedProfile);
      return res.status(200).json({
        success: true,
        message: "User profile fetched from cache",
        ...profileData,
      });
    }

    // If no cached data, fetch from the database
    const user = await Users.findById(req.user._id).select("-password");
    console.log(user);

    const profileOfUsers = await Profile.findById(user.profile);
    const bmi = profileOfUsers.calculateBMI();
    const waterIntake = profileOfUsers.calculateWaterIntake();
    const dailyStepRecommendation = profileOfUsers.recommendDailySteps();

    // Prepare the response data
    const responseData = {
      success: true,
      message: "User profile fetched successfully",
      profileOfUsers,
      calculations: {
        bmi,
        waterIntake,
        dailyStepRecommendation,
        weightLossDuration: profileOfUsers.calculateWeightLossDuration(),
      },
    };

    // Cache the user profile data
    await client.set(cacheKey, JSON.stringify(responseData), { EX: 3600 }); // Cache for 1 hour

    // Return the response
    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User profile fetch failed",
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const cacheKey = "allUsers"; // Create a unique cache key for all users

    // Check if the users data is cached
    const cachedUsers = await client.get(cacheKey);
    if (cachedUsers) {
      // If cached data exists, parse it and return
      const usersData = JSON.parse(cachedUsers);
      return res.status(200).json({
        success: true,
        data: usersData,
        source: "cache",
      });
    }

    const currentUserId = req.user._id;
    const users = await Profile.find({ _id: { $ne: currentUserId } });
    await client.set(cacheKey, JSON.stringify(users), { EX: 3600 });
    res.status(200).json({ success: true, data: users, source: "database" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error (get all users)",
      success: false,
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;
    console.log(updateData);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided to update." });
    }

    const userProfile = await Profile.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    if (updateData.preferredUnits) {
      if (updateData.preferredUnits === "imperial") {
        // if preferredUnits === "imperial" then change the metric value stored in the userProfile to imperial
        if (userProfile.currentHeight.centimeters) {
          const centimeters = userProfile.currentHeight.centimeters;
          const feet = Math.floor(centimeters / 30.48); // 1 foot = 30.48 cm
          const inches = Math.round((centimeters % 30.48) / 2.54); // 1 inch = 2.54 cm
          updateData.currentHeight = {
            feet,
            inches,
          };
        }
        if (userProfile.currentWeight.kilograms) {
          const pounds = Math.round(
            userProfile.currentWeight.kilograms * 2.20462
          ); // 1 kg = 2.20462 lbs
          updateData.currentWeight = {
            pounds,
          };
        }
        if (userProfile.goalWeight.kilograms) {
          const pounds = Math.round(userProfile.goalWeight.kilograms * 2.20462); // 1 kg = 2.20462 lbs
          updateData.goalWeight = {
            pounds,
          };
        }
      } else if (updateData.preferredUnits === "metric") {
        if (
          userProfile.currentHeight.feet &&
          userProfile.currentHeight.inches
        ) {
          const feet = userProfile.currentHeight.feet;
          const inches = userProfile.currentHeight.inches;
          const centimeters = Math.round(feet * 30.48 + inches * 2.54);
          updateData.currentHeight = {
            centimeters,
          };
        }
        if (userProfile.currentWeight.pounds) {
          const kilograms = Math.round(
            userProfile.currentWeight.pounds / 2.20462
          );
          updateData.currentWeight = {
            kilograms,
          };
        }
        if (userProfile.goalWeight.pounds) {
          const kilograms = Math.round(userProfile.goalWeight.pounds / 2.20462);
          updateData.goalWeight = {
            kilograms,
          };
        }
      }
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const bmi = updatedProfile.calculateBMI();
    const waterIntake = updatedProfile.calculateWaterIntake();
    const dailyStepRecommendation = updatedProfile.recommendDailySteps();

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
      calculations: {
        bmi,
        waterIntake,
        dailyStepRecommendation,
      },
    });
  } catch (error) {
    console.error("Error in updateProfileController:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const profilePicUpdateController = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    const profile = await Profile.findById(user.profile);

    const file = getDataUri(req.file);
    // Check if user has a profile picture already
    if (profile.profilePic && profile.profilePic.public_id) {
      // Delete previous profile picture from Cloudinary
      await cloudinary.v2.uploader.destroy(profile.profilePic.public_id);
    }

    // Upload new profile picture to Cloudinary
    const cdb = await cloudinary.v2.uploader.upload(file.content);

    // Update user's profile picture
    profile.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };

    // Save user
    await profile.save();

    return res.status(200).json({
      msg: "Profile pic updated successfully",
      success: true,
      profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Error (profile pic update)",
      success: false,
      error,
    });
  }
};
