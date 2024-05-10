import { PostExcerpt } from "./PostExcerpt";
import { useGetPostsQuery } from "../../services/postsService";
import { useNavigate } from "react-router-dom";

export const PostsList = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery(20);
  const navigate = useNavigate();

  const renderedPosts = posts?.map((post) => (
    <li key={post.id}>
      <PostExcerpt post={post} key={post.id} />
    </li>
  ));

  return (
    <section>
      <h2>Posts</h2>
      <button
        onClick={() => {
          navigate("new");
        }}
      >
        Add new post
      </button>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error while loading</h1>}
      {posts && <ul>{renderedPosts}</ul>}
    </section>
  );
};
