import { ChangeEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { selectUsers } from "../../redux/selectors/usersSelector";
import {
  useDeletePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "../../services/postsService";
import { IPost } from "../../redux/models/IPost";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  let post: IPost | undefined;
  if (postId) {
    const { data } = useGetPostByIdQuery(postId);
    post = data;
  }
  const { users } = selectUsers();

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.body || "");
  const [userId, setUserId] = useState(post?.userId || "");

  const [editPost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value || "");

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await editPost({
          id: post.id,
          title,
          body: content,
          userId,
          reactions: post.reactions,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/posts/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = async () => {
    try {
      await deletePost(post.id).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <div className="form-group">
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            className="form-control"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postAuthor">User</label>
          <select
            value={userId}
            onChange={onAuthorChanged}
            id="postAuthor"
            className="form-control"
          >
            <option>Choose...</option>
            {usersOptions}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            className="form-control"
            value={content}
            onChange={onContentChanged}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
