import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { todoReducer } from "./todos/todo_slice";

// Combine the reducers into a single root reducer
const rootReducer = combineReducers({
  todo: todoReducer,
});

// Create a persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  whitelist: ["todo"], // Specify which reducers to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor instance
const persistor = persistStore(store);

// Export the store and persistor
export { persistor, store };

// Export types for use in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
