import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  user: any;
  token: any;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
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
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, logout, loginSuccess } = authSlice.actions;

export default authSlice.reducer;
