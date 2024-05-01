import { RootState } from "../app/store";
import { useAppSelector } from "../hooks/redux";
import { IUser } from "../models/IUser";

export const selectUsers = () => useAppSelector((state) => state.usersReducer);
export const selectUserById = (state: RootState, userId: Number) =>
  state.usersReducer.users.find((user: IUser) => user.id === Number(userId));

