import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../utils/baseUrl";

export const fetchUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Could not load the users");
    }
  }
);
