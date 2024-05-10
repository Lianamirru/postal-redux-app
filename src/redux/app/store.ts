import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/usersSlice";
import { postsAPI } from "../../services/postsService";

const rootReducer = combineReducers({
  usersReducer,
  // rtk
  [postsAPI.reducerPath]: postsAPI.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // rtk
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export default setupStore;
