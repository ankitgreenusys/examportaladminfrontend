import React from "react";
import "./Styles.css";

import { Link } from "react-router-dom";
import { AppContext } from "../../Context";

const Index = () => {
  const { user, logout } = React.useContext(AppContext);
  const userType = localStorage.getItem("usertype");

  return (
    <section class="d-flex justify-content-between align-items-center px-3 py-2 header">
      <div class="">
        <hgroup>
          <h1>Greenusys</h1>
        </hgroup>
      </div>
      <div class="d-flex">
        {!user ? (
          <>
            <Link to="/teacherlogin" className="btn mx-2 btn-white">
              Teacher Login
            </Link>
            <Link to="/adminlogin" className="btn mx-2 btn-white">
              Admin Login
            </Link>
          </>
        ) : (
          <>
            {userType === "admin" ? (
              <>
                <Link to="addteacher" className="btn mx-2 btn-white">
                  Add Teacher
                </Link>
                <Link to="questionlist" className="btn mx-2 btn-white">
                  Question List
                </Link>
                <Link to="userlist" className="btn mx-2 btn-white">
                  User List
                </Link>
                <Link to="teacherlist" className="btn mx-2 btn-white">
                  Teacher List
                </Link>
                <Link to="results" className="btn mx-2 btn-white">
                  Results
                </Link>
              </>
            ) : (
              <>
                <Link to="addquestion" className="btn mx-2 btn-white">
                  Add Question
                </Link>
              </>
            )}
            <button onClick={logout} className="btn mx-2 btn-white">
              Logout
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Index;
