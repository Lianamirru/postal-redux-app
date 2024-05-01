import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";
import { fetchUsers } from "../actions/usersActions";

interface UsersState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: "",
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, { payload }: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.error = "";
        state.users = payload;
      }
    );
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUsers.rejected,
      (state, action: PayloadAction<string> | any) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default usersSlice.reducer;
