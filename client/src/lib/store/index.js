import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import authReducer from "./slices/authSlice";

// persistConfig.js
const persistConfig = {
  key: "root",
  version: 1, // You can use any versioning strategy here
  storage, // Using localStorage (default) for persistence
  whitelist: ["auth"], // Specify which slices to persist
};

// Persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Use persisted reducer
  },
});

const persistor = persistStore(store); // Persistor to manage rehydration

export { store, persistor };
export default store;
