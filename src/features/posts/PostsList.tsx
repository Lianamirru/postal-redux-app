import { selectPosts } from "../../redux/selectors/postsSelectors";
import { useAppDispatch } from "../../redux/hooks/redux";
import { fetchPosts } from "../../redux/actions/fetchPosts";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const PostsList = () => {
  const { posts, error, isLoading } = selectPosts();

  const useFetching = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchPosts());
    }, []);
  };

  useFetching();

  const renderedPosts = posts.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>posts</h2>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <ul>{renderedPosts}</ul>
    </section>
  );
};
