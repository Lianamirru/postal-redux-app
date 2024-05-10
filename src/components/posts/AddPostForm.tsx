import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IPost } from "../../redux/models/IPost";
import { useCreatePostMutation } from "../../services/postsService";
import { selectUsers } from "../../redux/selectors/usersSelector";
import { useAppDispatch } from "../../redux/hooks/redux";
import { fetchUsers } from "../../redux/actions/usersActions";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  // const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const { users } = selectUsers();

  const useFetching = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchUsers());
    }, []);
  };

  useFetching();

  const navigate = useNavigate();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onUserChanged = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  // const disableSave = !(title && content && addRequestStatus === "idle");
  const [createPost, { isLoading, error }] = useCreatePostMutation();
  const disableSave = !(title && content && !isLoading);

  const onSavePostClicked = async () => {
    try {
      // setAddRequestStatus("pending");
      // await dispatch(
      //   addPost({ title, body: content, userId: Number(userId) })
      // ).unwrap();
      await createPost({
        title,
        body: content,
        userId,
      } as IPost).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      // navigate("/");
    } catch (err) {
      console.log(err);
      // } finally {
      //   setAddRequestStatus("idle");
      // }
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
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
            onChange={onUserChanged}
            id="postAuthor"
            className="form-control"
          >
            <option>Choose...</option>
            {users.map((user) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
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
          className="btn btn-primary"
          onClick={onSavePostClicked}
          disabled={disableSave}
        >
          Save Post
        </button>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error while saving</h1>}
      </form>
    </section>
  );
};
