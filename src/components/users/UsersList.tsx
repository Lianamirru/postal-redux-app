import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/redux";
import { selectUsers } from "../../redux/selectors/usersSelector";
import { useEffect } from "react";
import { fetchUsers } from "../../redux/actions/usersActions";

export const UsersList = () => {
  const { users, isLoading, error } = selectUsers();

  const useFetching = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchUsers());
    }, []);
  };

  useFetching();

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <ul>{renderedUsers}</ul>
    </section>
  );
};
