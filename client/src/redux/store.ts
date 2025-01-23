import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slicer/authSlicer";
const store = configureStore({
  reducer: {
    authSlice: authSlice,
  },
});
// Define the `AppDispatch` type from the store's dispatch function
export type AppDispatch = typeof store.dispatch;
// Define the `RootState` type from the store's state
export type RootState = ReturnType<typeof store.getState>;
export default store;
