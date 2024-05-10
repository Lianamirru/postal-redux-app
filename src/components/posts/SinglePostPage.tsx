import { useParams, Link } from "react-router-dom";

import { PostAuthor } from "./PostAuthor";
import { IPost } from "../../redux/models/IPost";
import { useGetPostByIdQuery } from "../../services/postsService";

type PostExcerptProps = { post: IPost };

export const PostPage = () => {
  let { postId } = useParams();

  function PostExcerpt({ post }: PostExcerptProps) {
    return (
      <article className="post-excerpt">
        <h3>{post.title}</h3>
        <p className="post-content">{post.body}</p>
        <PostAuthor userId={String(post.userId)} />
        <Link to={`/posts/edit/${post.id}`}>
          <button className="btn post-button">Edit post</button>
        </Link>
      </article>
    );
  }

  let content;
  if (postId) {
    const { data: post } = useGetPostByIdQuery(postId);
    content = post ? <PostExcerpt post={post} /> : <h2>Post not found!</h2>;
  }

  return <section>{content}</section>;
};
