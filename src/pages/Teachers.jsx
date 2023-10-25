import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import TeachersUi from "../Components/TeachersUi";
import {
  fetchTeachers,
  addTeachersToDb,
  editTeachersDb,
} from "../Redux/teacherSlcie";

const Teachers = () => {
  const [displayForm, setDisplay] = useState(false);
  const [displayForm1, setDisplay1] = useState(false);

  const dipatcher = useDispatch();
  const teacherList = useSelector((state) => state.teachers);

  const status = useSelector((state) => state.teachers.status);
  console.log(status, teacherList);
  function getTeacherForm(event) {
    event.preventDefault();
    const data = {
      name: event.target.teachername.value,
      subject: event.target.subject.value,
      contact: event.target.contact.value,
    };
    console.log(data);
    dipatcher(addTeachersToDb(data));
    setDisplay(!displayForm);
  }
  function UpdateTeacherForm(event) {
    event.preventDefault();

    console.log(editData);
    dipatcher(editTeachersDb({ Id: editData._id, teacherData: editData }));
    setDisplay1(!displayForm1);
  }
  useEffect(() => {
    if (status === "idle") {
      dipatcher(fetchTeachers());
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
    const newTeacher = { ...editData, name: event.target.value };
    setEditData(newTeacher);
  }
  function editSubject(event) {
    const newTeacher = { ...editData, subject: event.target.value };
    setEditData(newTeacher);
  }
  function editContact(event) {
    const newTeacher = { ...editData, contact: event.target.value };
    setEditData(newTeacher);
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
            getTeacherForm(e);
            e.target.reset();
          }}
          className="p-6 flex flex-col text-xl rounded-lg bg-white w-fit mt-36 mx-auto space-y-2 space-x-2 "
        >
          <label>Enter Teacher Name</label>
          <input
            className="border-2 border-gray-400"
            required
            id="teachername"
            type="text"
          ></input>
          <label>Enter Subject name</label>
          <input
            className="border-2 border-gray-400"
            required
            id="subject"
            type="string"
          ></input>
          <label>Enter Contact</label>
          <input
            className="border-2 border-gray-400"
            required
            id="contact"
            type="number"
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
            UpdateTeacherForm(e);
            e.target.reset();
          }}
          className="p-6 flex flex-col text-xl rounded-lg bg-white w-fit mt-36 mx-auto space-y-2 space-x-2 "
        >
          <label>Edit teacher Name</label>
          <input
            className="border-2 border-gray-400"
            required
            onChange={(e) => editName(e)}
            value={editData.name}
            id="teacher"
            type="text"
          ></input>
          <label>Edit Subject</label>
          <input
            className="border-2 border-gray-400"
            required
            id="subject"
            value={editData.subject}
            onChange={(e) => editSubject(e)}
            type="string"
          ></input>
          <label>Edit Contact</label>
          <input
            className="border-2 border-gray-400"
            required
            onChange={(e) => editContact(e)}
            id="contact"
            value={editData.contact}
            type="number"
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
        {teacherList?.teachers.map((val) => (
          <TeachersUi
            key={val._id}
            data={val}
            edit={newEditData}
            form={editForm}
          ></TeachersUi>
        ))}
      </ul>
      <div className="text-center">
        <button
          className="bg-blue-500 p-2 text-white rounded text-lg mt-2"
          onClick={() => setDisplay((s) => !s)}
        >
          Add New Teacher
        </button>
      </div>
    </>
  );
};

export default Teachers;
