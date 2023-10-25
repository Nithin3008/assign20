import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const TeacherDetails = () => {
  const { teacherId } = useParams();

  const data = useSelector((state) =>
    state.teachers.teachers.find((t) => t._id === teacherId)
  );
  return (
    <div className="text-center">
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
      <Link
        className="bg-blue-500 p-2 text-white rounded text-lg mt-2"
        to="/teachers"
      >
        Go Back
      </Link>
    </div>
  );
};

export default TeacherDetails;
