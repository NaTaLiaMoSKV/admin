import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authSlice";
import { courseApi } from "./courseApi";
import { teacherApi } from "./teacherApi";
import { studentApi } from "./studentApi";
import { userApi } from "./userApi";
import { groupApi } from "./groupApi";
import { lessonApi } from "./lessonApi";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const authPersistedReducer = persistReducer(authConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      courseApi.middleware,
      userApi.middleware,
      teacherApi.middleware,
      studentApi.middleware,
      lessonApi.middleware,
      groupApi.middleware
    ),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
