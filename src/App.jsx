import "./App.css";
import Navigation from "./Components/Navigation";
import Class from "./pages/Class";
import Home from "./pages/Home";
import { School } from "./pages/School";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import StudentsDetails from "./Components/StudentsDetails";
import TeacherDetails from "./Components/TeacherDetails";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Students" element={<Students />}></Route>
        <Route path="/Teachers" element={<Teachers />}></Route>
        <Route path="/School" element={<School />}></Route>
        <Route path="/Class" element={<Class />}></Route>
        <Route path="/students/:studentId" element={<StudentsDetails />} />
        <Route path="/teachers/:teacherId" element={<TeacherDetails />} />
      </Routes>
    </div>
  );
}

export default App;
