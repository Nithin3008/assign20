import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teachers: [],
  status: "idle",
};

const teacher = createSlice({
  name: "teacherReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      console.log(state);
      state.status = "success";
      state.teachers = action.payload;
    });
    builder.addCase(addTeachersToDb.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addTeachersToDb.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    });
    builder.addCase(editTeachersDb.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(editTeachersDb.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    });
    builder.addCase(deleteTeachers.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteTeachers.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    });
  },
});

// export const { addteacher } = teacher.actions;
export default teacher.reducer;

export const fetchTeachers = createAsyncThunk(
  "teacherReducer/fetchTeachers",
  async () => {
    console.log("function called");
    const totalTech = await axios.get(
      "https://assign20.nithinrocky30.repl.co/Teachers"
    );
    console.log(totalTech.data.allTeachers);
    const received = totalTech.data.allTeachers;
    return received;
  }
);

export const addTeachersToDb = createAsyncThunk(
  "teacherReducer/addTeachersToDb",
  async (teacherData, thunkAPI) => {
    try {
      console.log("Sending teacher data:", teacherData);
      const totalTech = await fetch(
        `https://assign20.nithinrocky30.repl.co/add-teacher`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teacherData),
        }
      );
      console.log("Response status:", totalTech.status);

      if (totalTech.status === 201) {
        const received = await totalTech.json();
        console.log("Received data:", received.allTeachers);
        return received.allTeachers;
      }
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTeachersDb = createAsyncThunk(
  "teacherReducer/editTeachersDb",
  async ({ Id, teacherData }, thunkAPI) => {
    try {
      const totalTech = await fetch(
        `https://assign20.nithinrocky30.repl.co/edit-teacher/${Id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teacherData),
        }
      );

      if (totalTech.status === 201) {
        const received = await totalTech.json();
        console.log("Received data:", received.allTeachers);
        return received.allTeachers;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTeachers = createAsyncThunk(
  "teacherReducer/deleteTeachers",
  async (teacherId, thunkAPI) => {
    try {
      const deletedTech = await axios.delete(
        `https://assign20.nithinrocky30.repl.co/delete-teacher/${teacherId}`
      );
      if (deletedTech.status === 201) {
        const received = deletedTech.data.allTeachers;
        return received;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
