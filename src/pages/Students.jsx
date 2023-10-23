import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addStudentsToDb,
  fetchStudents,
  editStudentsDb,
} from "../Redux/studentSlice";
import TabsUi from "../Components/TabsUi";

const Students = () => {
  const [displayForm, setDisplay] = useState(false);
  const [displayForm1, setDisplay1] = useState(false);

  const dipatcher = useDispatch();
  const studentsList = useSelector((state) => state.students);

  const status = useSelector((state) => state.students.status);
  console.log(status, studentsList);
  function getSudentForm(event) {
    event.preventDefault();
    const data = {
      name: event.target.studentname.value,
      age: event.target.age.value,
      grade: event.target.grade.value,
      gender: event.target.gender.value,
      attendance: event.target.attendance.value,
      marks: event.target.marks.value,
      class: event.target.class.value,
      School: event.target.school.value,
    };
    // console.log(data);
    dipatcher(addStudentsToDb(data));
    setDisplay(!displayForm);
  }
  function UpdateStudentForm(event) {
    event.preventDefault();

    console.log(editData);
    dipatcher(editStudentsDb({ Id: editData._id, studentData: editData }));
    setDisplay1(!displayForm1);
  }
  useEffect(() => {
    if (status === "idle") {
      dipatcher(fetchStudents());
    }
  }, [status, dipatcher]);
  function editForm() {
    setDisplay1(!displayForm1);
  }
  const [editData, setEditData] = useState({});
  function newEditData(data) {
    setEditData(data);
  }

  function editName(event) {
    const newName = { ...editData, name: event.target.value };
    setEditData(newName);
  }
  function editAge(event) {
    const newStudent = { ...editData, age: event.target.value };
    setEditData(newStudent);
  }
  function editGrade(event) {
    const newStudent = { ...editData, grade: event.target.value };
    setEditData(newStudent);
  }
  function editGender(event) {
    const newStudent = { ...editData, gender: event.target.value };
    setEditData(newStudent);
  }
  function editAttendance(event) {
    const newStudent = { ...editData, attendance: event.target.value };
    setEditData(newStudent);
  }
  function editMarks(event) {
    const newStudent = { ...editData, marks: event.target.value };
    setEditData(newStudent);
  }
  function editClass(event) {
    const newStudent = { ...editData, class: event.target.value };
    setEditData(newStudent);
  }
  function editSchool(event) {
    const newStudent = { ...editData, School: event.target.value };
    setEditData(newStudent);
  }
  return (
    <>
      {" "}
      <div
        style={{
          display: displayForm ? "block" : "none",
        }}
        className="fixed hidden inset-0 overflow-auto bg-black bg-opacity-40 z-50"
      >
        <form
          onSubmit={(e) => {
            getSudentForm(e);
            e.target.reset();
          }}
          className="p-6 flex flex-col text-xl rounded-lg bg-white w-fit mt-36 mx-auto space-y-2 space-x-2 "
        >
          <label>Enter Student Name</label>
          <input
            className="border-2 border-gray-400"
            required
            id="studentname"
            type="text"
          ></input>
          <label>Enter age</label>
          <input
            className="border-2 border-gray-400"
            required
            id="age"
            type="number"
          ></input>
          <label>Enter Grade</label>
          <input
            className="border-2 border-gray-400"
            required
            id="grade"
            type="string"
          ></input>
          <label>Enter Gender</label>
          <input
            className="border-2 border-gray-400"
            required
            id="gender"
            type="string"
          ></input>
          <label>Enter Attendance</label>
          <input
            className="border-2 border-gray-400"
            required
            id="attendance"
            type="number"
          ></input>
          <label>Enter Marks</label>
          <input
            className="border-2 border-gray-400"
            required
            id="marks"
            type="number"
          ></input>
          <label>Enter Class</label>
          <input
            className="border-2 border-gray-400"
            required
            id="class"
            type="number"
          ></input>
          <label>Enter School</label>
          <input
            className="border-2 border-gray-400"
            required
            id="school"
            type="string"
          ></input>
          <button
            className="border-2 p-2 bg-blue-500 border-blue-500 rounded-md"
            type="submit"
          >
            Submit
          </button>
          <button
            className="border-2 p-2 bg-red-500 border-red-500 rounded-md"
            onClick={() => setDisplay(!displayForm)}
          >
            Cancel
          </button>
        </form>
      </div>
      <div
        style={{
          display: displayForm1 ? "block" : "none",
        }}
        className="fixed hidden inset-0 overflow-auto bg-black bg-opacity-40 z-50"
      >
        <form
          onSubmit={(e) => {
            UpdateStudentForm(e);
            e.target.reset();
          }}
          className="p-6 flex flex-col text-xl rounded-lg bg-white w-fit mt-36 mx-auto space-y-2 space-x-2 "
        >
          <label>Edit Student Name</label>
          <input
            className="border-2 border-gray-400"
            required
            onChange={(e) => editName(e)}
            value={editData.name}
            id="name"
            type="text"
          ></input>
          <label>Edit age</label>
          <input
            className="border-2 border-gray-400"
            required
            id="age"
            value={editData.age}
            onChange={(e) => editAge(e)}
            type="number"
          ></input>
          <label>Edit Grade</label>
          <input
            className="border-2 border-gray-400"
            required
            onChange={(e) => editGrade(e)}
            id="grade"
            value={editData.grade}
            type="string"
          ></input>
          <label>Edit Gender</label>
          <input
            className="border-2 border-gray-400"
            required
            id="gender"
            type="string"
            onChange={(e) => editGender(e)}
            value={editData.gender}
          ></input>
          <label>Enter Attendance</label>
          <input
            className="border-2 border-gray-400"
            required
            id="attendance"
            onChange={(e) => editAttendance(e)}
            type="number"
            value={editData.attendance}
          ></input>
          <label>Enter Marks</label>
          <input
            className="border-2 border-gray-400"
            required
            id="marks"
            type="number"
            onChange={(e) => editMarks(e)}
            value={editData.marks}
          ></input>
          <label>Enter Class</label>
          <input
            className="border-2 border-gray-400"
            onChange={(e) => editClass(e)}
            required
            id="class"
            type="number"
            value={editData.class}
          ></input>
          <label>Enter School</label>
          <input
            className="border-2 border-gray-400"
            required
            id="school"
            type="string"
            value={editData.School}
            onChange={(e) => editSchool(e)}
          ></input>

          <button
            className="border-2 p-2 bg-blue-500 border-blue-500 rounded-md"
            type="submit"
          >
            Submit
          </button>
          <button
            className="border-2 p-2 bg-red-500 border-red-500 rounded-md"
            onClick={() => setDisplay1(!displayForm1)}
          >
            Cancel
          </button>
        </form>
      </div>
      <ul>
        {studentsList?.students.map((val) => (
          <TabsUi
            key={val._id}
            data={val}
            edit={newEditData}
            form={editForm}
          ></TabsUi>
        ))}
      </ul>
      <button onClick={() => setDisplay((s) => !s)}>Add Item</button>
    </>
  );
};

export default Students;
