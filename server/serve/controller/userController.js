import Users from "../models/user.js";
import Profile from "../models/profile.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../util/features.js";

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
    } = req.body;

    const userId = req.user._id;

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Profile already exists for this user." });
    }

    // Handle height parsing based on preferred units
    let heightData;
    if (typeof currentHeight === "string") {
      try {
        heightData = JSON.parse(currentHeight);
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

    // Handle weight conversion based on preferred units
    let weightInKg = 0;
    if (preferredUnits === "imperial") {
      weightInKg = currentWeight * 0.453592; // Convert lbs to kg
    } else if (preferredUnits === "metric") {
      weightInKg = currentWeight;
    } else {
      return res
        .status(400)
        .json({ message: "Weight must be provided correctly." });
    }

    let goalWeightInKg = 0;
    if (preferredUnits === "imperial") {
      goalWeightInKg = goalWeight * 0.453592; // Convert lbs to kg
    } else if (preferredUnits === "metric") {
      goalWeightInKg = goalWeight;
    } else {
      return res
        .status(400)
        .json({ message: "Goal weight must be provided correctly." });
    }

    // Handle profile picture upload
    let profilePicData = {};
    const file = getDataUri(req.file);
    if (file) {
      const result = await cloudinary.v2.uploader.upload(file.content);
      profilePicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

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
          ? { pounds: currentWeight }
          : { kilograms: currentWeight },
      goalWeight:
        preferredUnits === "imperial"
          ? { pounds: goalWeight }
          : { kilograms: goalWeight },
      activityLevel,
      activitiesLiked,
      specialPrograms,
      dailySteps,
      preferredDietType,
      profilePic: profilePicData,
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

export const getUserProfileController = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).select("-password");

    const profileOfUsers = await Profile.findById(user.profile);
    const bmi = profileOfUsers.calculateBMI();
    const waterIntake = profileOfUsers.calculateWaterIntake();
    const dailyStepRecommendation = profileOfUsers.recommendDailySteps();

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      profileOfUsers,
      calculations: {
        bmi,
        waterIntake,
        dailyStepRecommendation,
        weightLossDuration: profileOfUsers.calculateWeightLossDuration(),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User profile fetched failed",
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
