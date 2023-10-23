import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  students: [],
  status: "idle",
};

const student = createSlice({
  name: "studentReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      console.log(state);
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(addStudentsToDb.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addStudentsToDb.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(editStudentsDb.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(editStudentsDb.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(deleteStudents.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
  },
});

export const { addStudent } = student.actions;
export default student.reducer;

export const fetchStudents = createAsyncThunk(
  "studentReducer/fetchStudents",
  async () => {
    console.log("function called");
    const totalStu = await axios.get(
      "https://assign20.nithinrocky30.repl.co/students"
    );
    console.log(totalStu.data.allStudents);
    const received = totalStu.data.allStudents;
    return received;
  }
);

export const addStudentsToDb = createAsyncThunk(
  "studentReducer/addStudentsToDb",
  async (studentData, thunkAPI) => {
    try {
      console.log("Sending student data:", studentData);
      const totalStu = await fetch(
        `https://assign20.nithinrocky30.repl.co/add-student`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        }
      );
      console.log("Response status:", totalStu.status);

      if (totalStu.status === 201) {
        const received = await totalStu.json();
        console.log("Received data:", received.allStudents);
        return received.allStudents;
      }
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editStudentsDb = createAsyncThunk(
  "studentReducer/editStudentsDb",
  async ({ Id, studentData }, thunkAPI) => {
    try {
      const totalStu = await fetch(
        `https://assign20.nithinrocky30.repl.co/edit-student/${Id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        }
      );

      if (totalStu.status === 201) {
        const received = await totalStu.json();
        console.log("Received data:", received.allStudents);
        return received.allStudents;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteStudents = createAsyncThunk(
  "studentReducer/deleteStudents",
  async (studentId, thunkAPI) => {
    try {
      const deletedStu = await axios.delete(
        `https://assign20.nithinrocky30.repl.co/delete-student/${studentId}`
      );
      if (deletedStu.status === 201) {
        const received = deletedStu.data.allStudents;
        return received;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
