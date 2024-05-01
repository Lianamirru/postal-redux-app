import {
  PayloadAction,
  createEntityAdapter,
  createReducer,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchPosts } from "../actions/fetchPosts";
import { IPost } from "../models/IPost";

interface PostsState {
  posts: IPost[];
  isLoading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPosts.fulfilled,
      (state, { payload }: PayloadAction<IPost[]>) => {
        state.isLoading = false;
        state.posts = payload;
      }
    );
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchPosts.rejected,
      (state, { payload }: PayloadAction<string> | any) => {
        state.isLoading = false;
        state.error = payload;
      }
    );
  },
});

export default postsSlice.reducer;
