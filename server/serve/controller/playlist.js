import Playlist from "../models/playlist.js";

export const createPlaylist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { data } = req.body;

    if (data.length === 0) {
      return res.status(400).json({
        message: "Data should be a non-empty array of exercise objects.",
      });
    }
    let playlist = await Playlist.findOne({ user: userId });

    if (playlist) {
      playlist.exercises.push(data);
      playlist = await playlist.save();
      console.log("Playlist updated:", playlist);
    } else {
      playlist = await Playlist.create({
        user: userId,
        exercises: data,
      });
      console.log("Playlist created:", playlist);
    }

    return res.status(201).json(playlist);
  } catch (error) {
    console.error("Error creating playlist:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the playlist." });
  }
};

export const getUserPlaylist = async (req, res) => {
  try {
    const userId = req.user._id;
    const playlists = await Playlist.find({ user: userId });

    console.log(playlists);
    if (!playlists || playlists.length === 0) {
      return res
        .status(404)
        .json({ message: "No playlists found for this user." });
    }

    return res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the playlists." });
  }
};

export const getOneExerciseFromUserPlaylist = async (req, res) => {
  try {
    const userId = req.user._id;
    const exerciseId = req.params.exerciseId;

    const playlist = await Playlist.findOne({
      user: userId,
    });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found." });
    }

    // Find the exercise inside the playlist's exercises array by exerciseId
    const exercise = playlist.exercises.find(
      (exercise) => exercise._id.toString() === exerciseId
    );

    if (!exercise) {
      return res
        .status(404)
        .json({ message: "Exercise not found in the playlist." });
    }

    return res.status(200).json(exercise);
  } catch (error) {
    console.error("Error fetching the exercise from playlist:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the exercise." });
  }
};

export const deleteFromUserPlaylist = async (req, res) => {
  try {
    const userId = req.user._id;
    const exerciseId = req.body.exerciseId;

    const playlist = await Playlist.findOne({ user: userId });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found." });
    }

    const exerciseIndex = playlist.exercises.findIndex(
      (exercise) => exercise._id.toString() === exerciseId
    );

    if (exerciseIndex === -1) {
      return res
        .status(404)
        .json({ message: "Exercise not found in the playlist." });
    }

    playlist.exercises.splice(exerciseIndex, 1);

    await playlist.save();

    return res
      .status(200)
      .json({ message: "Exercise removed from playlist.", playlist });
  } catch (error) {
    console.error("Error removing exercise from playlist:", error);
    return res.status(500).json({
      message:
        "An error occurred while removing the exercise from the playlist.",
    });
  }
};
