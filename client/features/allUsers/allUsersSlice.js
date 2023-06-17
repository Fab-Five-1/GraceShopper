import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk("allUsers", async () => {
  try {
    const { data } = await axios.get("api/users"); // Make sure that this is the correct endpoint for fetching all users from your server. You should update this endpoint if necessary.
    return data;
  } catch (error) {
    console.log(error);
  }
});


const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    userList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

export const selectAllUsers = (state) => {
    return state.allUsers.userList;
}

export default allUsersSlice.reducer;
