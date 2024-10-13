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
    } = req.body;

    console.log(req.body);
    const userId = req.user._id;

    const existingProfile = await Profile.findOne({ user: userId });

    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Profile already exists for this user." });
    }

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
    if (heightData.feet !== undefined && heightData.inches !== undefined) {
      heightInCm = heightData.feet * 30.48 + heightData.inches * 2.54;
    } else if (heightData.centimeters !== undefined) {
      heightInCm = heightData.centimeters;
    } else {
      return res.status(400).json({ message: "Height must be provided." });
    }

    const weightUnit = "kg";
    let weightInKg = 0;

    if (weightUnit === "lbs") {
      weightInKg = currentWeight * 0.453592; // Convert lbs to kg
    } else if (weightUnit === "kg") {
      weightInKg = currentWeight;
    } else {
      return res
        .status(400)
        .json({ message: "Weight must be provided correctly." });
    }

    let goalWeightInKg = 0;

    if (weightUnit === "lbs") {
      goalWeightInKg = goalWeight * 0.453592; // Convert lbs to kg
    } else if (weightUnit === "kg") {
      goalWeightInKg = goalWeight;
    } else {
      return res
        .status(400)
        .json({ message: "Goal weight must be provided correctly." });
    }

    const file = getDataUri(req.file);

    let profilePicData = {};
    if (file) {
      const result = await cloudinary.v2.uploader.upload(file.content);
      profilePicData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const newProfile = new Profile({
      user: userId,
      name,
      gender,
      birthday,
      currentHeight: { centimeters: heightInCm },
      currentWeight: weightInKg,
      goalWeight: goalWeightInKg,
      activityLevel,
      activitiesLiked,
      specialPrograms,
      dailySteps,
      preferredDietType,
      profilePic: profilePicData,
    });

    await newProfile.save();

    await Users.findByIdAndUpdate(userId, { profile: newProfile._id });

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

    const profileOfUsere = await Profile.findById(user.profile);
    console.log(req.user);
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      profileOfUsere,
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

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided to update." });
    }

    if (updateData.currentHeight) {
      if (typeof updateData.currentHeight === "string") {
        updateData.currentHeight = JSON.parse(updateData.currentHeight);
      }
      if (updateData.currentHeight.feet || updateData.currentHeight.inches) {
        updateData.currentHeight.centimeters = undefined; // Remove centimeters if feet/inches are provided
      }
      if (updateData.currentHeight.centimeters) {
        updateData.currentHeight.feet = undefined;
        updateData.currentHeight.inches = undefined;
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

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
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
