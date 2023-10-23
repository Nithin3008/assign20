import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchStudents } from "../Redux/studentSlice";
export const School = () => {
  const studentsList = useSelector((state) => state.students);
  const status = useSelector((state) => state.students.status);

  const dipatcher = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dipatcher(fetchStudents());
    }
  }, [status, dipatcher]);
  const totalStudents = studentsList.students.length;
  const averageAttendace =
    studentsList?.students.reduce((acc, val) => acc + val.attendance, 0) /
    totalStudents;
  const averageMarks =
    studentsList?.students.reduce((acc, val) => acc + val.marks, 0) /
    totalStudents;
  const topPerformer = studentsList?.students.reduce((prev, current) =>
    prev.marks > current.marks ? prev : current
  );
  // const topper = studentsList?.students.sort((a, b) => b.marks - a.marks);
  console.log(
    studentsList.students,
    totalStudents,
    averageAttendace,
    averageMarks,
    topPerformer
  );
  return (
    <div className="text-center">
      {/* <p>{topper[0]}</p> */}
      <div>
        <h1>Tooper:</h1>
        <p>Name: {topPerformer.name}</p>
        <p>Marks: {topPerformer.marks}</p>
        <p>Attendance: {topPerformer.attendance}</p>
      </div>
      <p>Total Average Marks: {averageMarks}</p>
      <p>Total Average Attendance: {averageAttendace}</p>
      <p>Total Number of Students: {totalStudents}</p>
    </div>
  );
};
