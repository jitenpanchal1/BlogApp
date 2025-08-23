import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./AuthSlice";

const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});

export default store;
