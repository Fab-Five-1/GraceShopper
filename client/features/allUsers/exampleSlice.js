import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllStudents = createAsyncThunk("allStudents", async () => {
  try {
    const { data } = await axios.get("/api/students");
    return data;
  } catch (error) {
    console.log(error);
  }
});

// ADD Student Button
export const addNewStudent = createAsyncThunk("newStudent", async (student) => {
  try {
    const { data } = await axios.post("/api/students", student);
    console.log("addnewStudent returned data from server");
    return data;
  } catch (error) {
    console.log(error);
  }
});

// DELETE Student Button
export const deleteStudent = createAsyncThunk("deleteStudent", async (id) => {
  const { data } = await axios.delete(`/api/students/${id}`);
  return data;
});

const allStudentsSlice = createSlice({
  name: "allStudents",
  initialState: {
    studentList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllStudents.fulfilled, (state, action) => {
      state.studentList = action.payload;
    });
    // ADD Student
    builder.addCase(addNewStudent.fulfilled, (state, action) => {
      console.log("adding new student to redux", action.payload);
      const currentStudent = state.studentList;
      // this contains the data that was returned from our server (line 18 in add new student)
      currentStudent.push(action.payload);
      state.studentList = [...currentStudent];
    });
    // DELETE Student
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      const newState = state.studentList.filter(
        (student) => student.id !== action.payload.id
      );
      state.studentList = newState;
      console.log("this is newState ---->", newState);
      // return newState;
    });
  },
});

export const selectAllStudents = (state) => {
  return state.allStudents.studentList;
};

export default allStudentsSlice.reducer;
