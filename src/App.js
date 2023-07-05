import React from "react";
import "./App.css";

import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Components/Home";
import Header from "./Components/Header";
import Login from "./Components/Login";
import AddTeacher from "./Components/AddTeacher";
import AddQuestion from "./Components/AddQuestion";
import QuestionList from "./Components/QuestionList";
import Results from "./Components/Results";
import UserList from "./Components/UserList";
import TeacherList from "./Components/TeacherList";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        theme="dark"
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/teacherlogin" element={<Login type="teacher" />} />
        <Route path="/addquestion" element={<AddQuestion />} />
        
        <Route path="/adminlogin" element={<Login type="admin" />} />
        <Route path="/addteacher" element={<AddTeacher />} />
        <Route path="/questionlist" element={<QuestionList />} />
        <Route path="/results" element={<Results />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/teacherlist" element={<TeacherList />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
