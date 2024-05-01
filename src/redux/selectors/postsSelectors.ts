import { useAppSelector } from "../hooks/redux";

export const selectPosts = () => useAppSelector((state) => state.postsReducer);
