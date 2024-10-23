import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import { authApi } from "./api/apiClient";
import authReducer from "./slices/userSlice";
import profileReducer from "./slices/profileSlice";
import { createLogger } from "redux-logger";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  profile: profileReducer,
});
const logger = createLogger();
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, logger),
});

export const persistor = persistStore(store);
