/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { deleteStudents } from "../Redux/studentSlice";
import { useNavigate } from "react-router";
const TabsUi = ({ data, edit, form }) => {
  const dispatcher = useDispatch();
  const nav = useNavigate();
  return (
    <>
      <li className="border-4 list-none w-2/4 m-auto space-y-2 p-2 my-2">
        <p>
          <span className="font-medium text-xl">Student Name : </span>
          {data.name}
        </p>
        <p>
          <span className="font-medium text-xl">Student Age : </span>
          {data.age}
        </p>
        <p>
          <span className="font-medium text-xl">Student Grade : </span>
          {data.grade}
        </p>
        <p>
          <span className="font-medium text-xl">Student Gender : </span>
          {data.gender}
        </p>
        <p>
          <span className="font-medium text-xl">Student Attendance : </span>
          {data.attendance}
        </p>
        <p>
          <span className="font-medium text-xl">Student Marks : </span>
          {data.marks}
        </p>
        <p>
          <span className="font-medium text-xl">Student Class : </span>
          {data.class}
        </p>
        {/* <p>
          <span className="font-medium text-xl">Student School : </span>
          {data.School}
        </p> */}
        <button
          onClick={() => dispatcher(deleteStudents(data._id))}
          className="bg-red-500 p-2 text-white rounded text-lg "
        >
          Delete
        </button>
        <button
          className="bg-red-500 p-2 text-white rounded text-lg ml-2"
          onClick={() => {
            edit(data);
            form();
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 p-2 text-white rounded text-lg ml-2"
          onClick={() => nav(`/Students/${data._id}`)}
        >
          View
        </button>
      </li>
    </>
  );
};

export default TabsUi;
