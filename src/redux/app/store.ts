import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/usersSlice";
import postsReducer from "../reducers/postsSlice";

const rootReducer = combineReducers({
  usersReducer,
  postsReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export default setupStore;
