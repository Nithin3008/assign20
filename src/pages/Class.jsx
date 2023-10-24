import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../Redux/studentSlice";
import { useEffect, useState } from "react";
import { fetchClass } from "../Redux/schoolClassSlice";
import StudentsUi from "../Components/Studentsui";
const Class = () => {
  const dispatcher = useDispatch();
  const studentsList = useSelector((state) => state.students);

  const status = useSelector((state) => state.students.status);
  const studentsSchools = studentsList?.students.map((val) => val.class);
  const schoolsList = new Set(studentsSchools);
  const [schoolFilter, setSchoolFilter] = useState("None");
  const [genderFilter, setGender] = useState("None");
  const schoolListData = useSelector((state) => state.schoolClass);
  const [applyFilters, setFilters] = useState("");
  console.log(schoolListData);
  useEffect(() => {
    if (status === "idle") {
      console.log("1st useEffect");
      dispatcher(fetchStudents());
    }
  }, []);
  function schoolFilterSet(event) {
    dispatcher(fetchClass(event.target.value));
    setSchoolFilter(event.target.value);
  }
  useEffect(() => {
    console.log("2nd useEffect");
    dispatcher(fetchClass());
  }, [dispatcher]);
  const getSortingFunction = (filter) => {
    switch (filter) {
      case "name":
        return (a, b) => a.name.localeCompare(b.name);
      case "marks":
        return (a, b) => a.marks - b.marks;
      case "attendance":
        return (a, b) => a.attendance - b.attendance;
      case "age":
        return (a, b) => a.age - b.age;
      default:
        // No sorting, or you can return the default sorting (by class, for example).
        return (a, b) => "None";
    }
  };

  // Later in your code...
  const sortingFunction = getSortingFunction(applyFilters);
  let showData =
    applyFilters === "None"
      ? schoolListData?.class
      : schoolListData?.class.slice().sort(sortingFunction);
  showData =
    genderFilter === "None"
      ? showData
      : showData.filter(
          (val) => val.gender.toLowerCase() === genderFilter.toLowerCase()
        );
  console.log(showData);
  return (
    <div className="text-center mt-3">
      <div className="flex items-center justify-center space-x-3">
        <select onChange={(e) => schoolFilterSet(e)}>
          <option>None</option>
          {Array.from(schoolsList)?.map((val, i) => (
            <option key={i}>{val}</option>
          ))}
        </select>
        <p>Apply Filters</p>
        <select onChange={(e) => setFilters(e.target.value)}>
          <option>None</option>
          <option>name</option>
          <option>marks</option>
          <option>attendance</option>
          <option>age</option>
        </select>
        <p>Gender Filter</p>
        <select onChange={(e) => setGender(e.target.value)}>
          <option>None</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <ul>
        {showData?.map((val) => (
          <StudentsUi key={val._id} data={val}></StudentsUi>
        ))}
      </ul>
    </div>
  );
};

export default Class;
