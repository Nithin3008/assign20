import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const StudentsDetails = () => {
  const { studentId } = useParams();

  const data = useSelector((state) =>
    state.students.students.find((s) => s._id === studentId)
  );
  return (
    <div className="text-center">
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
      <p>
        <span className="font-medium text-xl">Student School : </span>
        {data.School}
      </p>
      <Link
        className="bg-blue-500 p-2 text-white rounded text-lg mt-2"
        to="/Students"
      >
        Go Back
      </Link>
    </div>
  );
};

export default StudentsDetails;
