/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { deleteTeachers } from "../Redux/teacherSlcie";
import { useNavigate } from "react-router";
const TeachersUi = ({ data, edit, form }) => {
  const dispatcher = useDispatch();
  const nav = useNavigate();
  return (
    <>
      <li className="border-4 list-none w-2/4 m-auto space-y-2 p-2 my-2">
        <p>
          <span className="font-medium text-xl">Teacher Name : </span>
          {data.name}
        </p>
        <p>
          <span className="font-medium text-xl">TEacher Subject : </span>
          {data.subject}
        </p>
        <p>
          <span className="font-medium text-xl">Teacher Contact : </span>
          {data.contact}
        </p>

        <button
          onClick={() => dispatcher(deleteTeachers(data._id))}
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
          onClick={() => nav(`/teachers/${data._id}`)}
        >
          View
        </button>
      </li>
    </>
  );
};

export default TeachersUi;
