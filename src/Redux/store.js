import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";
import teacherReducer from "./teacherSlcie";
import schoolClassReducer from "./schoolClassSlice";
const store = configureStore({
  reducer: {
    students: studentReducer,
    teachers: teacherReducer,
    schoolClass: schoolClassReducer,
  },
});

export default store;
