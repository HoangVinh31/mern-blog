import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer, // Add other reducers here if needed. This is just a basic example.  // Import your other reducers here. For example, import counterReducer from './counter/counterSlice';
  // counter: counterReducer,  // Add your other reducers here. This is just a basic example.  // Import your other reducers here. For example, import counterReducer from './counter/counterSlice';
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
