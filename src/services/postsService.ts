import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../utils/baseUrl";
import { IPost } from "../redux/models/IPost";
// import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// const postsAdapter = createEntityAdapter({
//   selectId: (post) => post.id,
//   sortComparer: (a: IPost, b: IPost) => b.title.localeCompare(a.title),
// });
// const initialState = postsAdapter.getInitialState();

export const postsAPI = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getPosts: build.query<IPost[], number>({
      query: (limit: number) => ({
        url: "/posts",
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [],
      transformResponse: (result: IPost[]) => {
        const loadedPosts = result.map((post) => {
          if (!post.reactions) {
            post.reactions = { thumbsUp: 0, hooray: 0, heart: 0 };
          }
          return post;
        });
        return loadedPosts;
      },
    }),
    getPostById: build.query<IPost, string>({
      query: (postId) => ({
        url: "/posts/" + postId,
      }),
    }),
    createPost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: { ...post, reactions: { thumbsUp: 0, hooray: 0, heart: 0 } },
      }),

      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    updatePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Posts", id: arg.id }],
    }),
    deletePost: build.mutation<IPost, string>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
        body: { id: postId },
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Posts", id: arg }],
    }),
  }),
});

// export const selectPostsResult = postsAPI.endpoints.getPosts.select()(state);

// // memoized selector
// const selectPostsData = createSelector(
//   selectPostsResult,
//   (posts) => posts.data
// );

// export const {
//   selectAll: selectPosts,
//   selectById: selectPostById,
//   selectIds: selectPostsIds,
// } = postsAdapter.getSelectors(
//   (state) => selectPostsData(state) || initialState
// );

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsAPI;
