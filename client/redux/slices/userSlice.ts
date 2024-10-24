import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { persistor } from "../store";

interface AuthState {
  isLoggedIn: boolean;
  user: any;
  token: any;
  isRegProcess: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRegProcess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    registrationProcess: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isRegProcess = true;
    },
    registrationComplete: (state) => {
      state.isRegProcess = false;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      // persistor.purge();
      try {
        AsyncStorage.clear(); // This will remove all stored data in AsyncStorage
      } catch (error) {
        console.error("Error clearing async storage:", error);
      }
    },
  },
});

export const {
  setCredentials,
  logout,
  loginSuccess,
  registrationComplete,
  registrationProcess,
} = authSlice.actions;

export default authSlice.reducer;
