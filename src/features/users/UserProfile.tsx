import { useParams } from "react-router-dom";
import { selectUserById } from "../../redux/selectors/usersSelector";
import { useAppSelector } from "../../redux/hooks/redux";
// import {
//   selectPostsForUser,
//   useGetPostByUserIdQuery,
// } from "../posts/postsSlice";

export const UserProfile = () => {
  let { userId } = useParams();
  if (!userId) {
    return;
  }
  const user = useAppSelector((state) => selectUserById(state, Number(userId)));

  // const postsForUser = useSelector((state) =>
  //   selectPostsForUser(state, userId)
  // );

  // const {
  //   data: postsForUser,
  //   isLoading,
  //   isSuccess,
  // } = useGetPostByUserIdQuery(userId);

  // const PostTitles = ({ postsForUser }) => {
  //   const { ids, entities } = postsForUser;

  //   return (
  //     <ul>
  //       {ids.map((id) => (
  //         <li key={id}>
  //           <Link to={`/posts/${id}`}>{entities[id].title}</Link>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

  // let content;
  // if (isLoading) {
  //   content = <p>Posts are loading</p>;
  // } else if (isSuccess) {
  //   postsForUser.ids.length === 0
  //     ? (content = "No posts written by this user")
  //     : (content = <PostTitles postsForUser={postsForUser} />);
  // }

  return (
    <section>
      <h2>{user?.name}</h2>
      {user?.name}
    </section>
  );
};
