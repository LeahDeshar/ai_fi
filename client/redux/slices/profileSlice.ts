import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  gender: "",
  birthday: "",
  currentHeight: { centimeters: null, feet: null, inches: null },
  currentWeight: { kilograms: null, pounds: null },
  goalWeight: { kilograms: null, pounds: null },

  activityLevel: "",
  activitiesLiked: [],
  specialPrograms: [],
  dailySteps: null,
  preferredDietType: "",
  preferredUnits: "",
  profilePic: {},
  savedSteps: 0,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSavedSteps: (state, action) => {
      state.savedSteps = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload;
    },
    setCurrentHeight: (state, action) => {
      state.currentHeight = action.payload;
    },
    setCurrentWeight: (state, action) => {
      state.currentWeight = action.payload;
    },
    setGoalWeight: (state, action) => {
      state.goalWeight = action.payload;
    },
    setActivityLevel: (state, action) => {
      state.activityLevel = action.payload;
    },
    setActivitiesLiked: (state, action) => {
      state.activitiesLiked = action.payload;
    },
    setSpecialPrograms: (state, action) => {
      state.specialPrograms = action.payload;
    },
    setDailySteps: (state, action) => {
      state.dailySteps = action.payload;
    },
    setPreferredDietType: (state, action) => {
      state.preferredDietType = action.payload;
    },
    setPreferredUnits: (state, action) => {
      state.preferredUnits = action.payload;
    },
    resetProfile: () => initialState,
  },
});

export const {
  setName,
  setGender,
  setBirthday,
  setCurrentHeight,
  setCurrentWeight,
  setGoalWeight,
  setActivityLevel,
  setActivitiesLiked,
  setSpecialPrograms,
  setProfilePic,
  setDailySteps,
  setPreferredDietType,
  setPreferredUnits,
  resetProfile,
  setSavedSteps,
} = profileSlice.actions;

export default profileSlice.reducer;
