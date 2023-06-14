import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ADD User Button
export const addNewUser = createAsyncThunk("newUser", async (user) => {
  try {
    const { data } = await axios.post("/api/users", user);
    console.log("addnewUser returned data from server");
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
    // builder.addCase(fetchUserSlice.fulfilled, (state, action) => {
    //   state.userList = action.payload;
    // });

    // ADD User
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      console.log("adding new user to redux", action.payload);
      const currentUser = state.userList;
      // this contains the data that was returned from our server
      currentUser.push(action.payload);
      state.userList = [...currentUser];
    });
  },
});

export const selectAllUsers = (state) => {
  return state.allUsers.userList;
};

export default allUsersSlice.reducer;
