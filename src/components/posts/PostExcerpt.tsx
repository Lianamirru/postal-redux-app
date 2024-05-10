import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { PostAuthor } from "./PostAuthor";
import { IPost } from "../../redux/models/IPost";

type PostExcerptProps = { post: IPost };

export const PostExcerpt: FC<PostExcerptProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <p className="post-content">{post.body?.substring(0, 100)}</p>
      <PostAuthor userId={post.userId} />
      <button
        className="btn post-button"
        onClick={() => {
          navigate(post.id);
        }}
      >
        View post
      </button>
    </article>
  );
};
