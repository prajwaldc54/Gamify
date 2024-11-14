import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../stores/reducers/userSlice"

export const store = configureStore({
  reducer: {
     user: userReducer,
    },
});
