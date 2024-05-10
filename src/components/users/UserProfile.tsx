import { useParams } from "react-router-dom";
import { selectUserById } from "../../redux/selectors/usersSelector";
import { useAppSelector } from "../../redux/hooks/redux";

export const UserProfile = () => {
  let { userId } = useParams();
  if (!userId) {
    return;
  }
  const user = useAppSelector((state) => selectUserById(state, userId));

  return (
    <section>
      <h2>{user?.name}</h2>
      {user?.name}
    </section>
  );
};
