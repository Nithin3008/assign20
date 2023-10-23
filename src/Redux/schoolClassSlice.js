import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  class: [],
  status: "idle",
};
const schoolClass = createSlice({
  name: "schoolClassReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClass.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchClass.fulfilled, (state, action) => {
      state.status = "success";
      state.class = action.payload;
    });
  },
});
export default schoolClass.reducer;
// export const fetchSchool = createAsyncThunk(
//   "schoolClass/fetchSchool ",
//   async (schoolName, thunkAPI) => {
//     console.log("function called");
//     const totalStu = await axios.get(
//       "https://assign20.nithinrocky30.repl.co/students"
//     );
//     console.log(totalStu.data.allStudents);
//     const received = totalStu.data.allStudents;
//     const schoolData =
//       schoolName == "None"
//         ? received
//         : received.filter((val) => val.School == schoolName);
//     return schoolData;
//   }
// );
export const fetchClass = createAsyncThunk(
  "schoolClass/fetchClass ",
  async (className, thunkAPI) => {
    console.log("function called");
    const totalStu = await axios.get(
      "https://assign20.nithinrocky30.repl.co/students"
    );
    console.log(totalStu.data.allStudents);
    const received = totalStu.data.allStudents;
    const classData =
      className === "None"
        ? received
        : received.filter((val) => val.class == className);
    console.log(classData);
    return classData;
  }
);
