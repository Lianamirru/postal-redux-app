import { selectUsers } from "../../redux/selectors/usersSelector";

export const PostAuthor = ({ userId }: { userId: string }) => {
  const { users } = selectUsers();
  const author = users.find((user) => userId === user.id);
  return <span>by {author ? author.name : "Unknown author"}</span>;
};
