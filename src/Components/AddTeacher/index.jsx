import React from "react";
import "./Styles.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";

import Admin_URL from "../../Common/Admin.url";

const Index = () => {
  const navigate = useNavigate();
  const { user, userJwt } = React.useContext(AppContext);

  React.useEffect(() => {
    if (!userJwt || !user) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [userJwt, user, navigate]);

  const [teacher, setTeacher] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setTeacher({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teacher.name) {
      toast.error("Please enter name");
      return;
    }
    if (!teacher.email) {
      toast.error("Please enter email");
      return;
    }
    if (!teacher.password) {
      toast.error("Please enter password");
      return;
    }

    fetch(Admin_URL + "/addteacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userJwt}`,
      },
      body: JSON.stringify(teacher),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Teacher added successfully");
          handleClear();
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="addques-page flex-column align-items-center d-flex justify-content-center">
      <div className="white-header">
        <h1>Add Teacher</h1>
      </div>
      <div className="white-box">
        <div className="mt-2">
          <div className="addquesform my-3">
            <label htmlFor="name">Name</label>
            <input
              className="form-control my-2"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={teacher.name}
              onChange={handleChange}
            />
          </div>
          <div className="addquesform my-3">
            <label htmlFor="email">Email</label>
            <input
              className="form-control my-2"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={teacher.email}
              onChange={handleChange}
            />
          </div>
          <div className="addquesform my-3">
            <label htmlFor="password">Password</label>
            <input
              className="form-control my-2"
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              value={teacher.password}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="detailsbtns bottom-btns">
        <button onClick={handleSubmit} className="exambtn btn-green">
          Add Teacher
        </button>
      </div>
    </div>
  );
};

export default Index;
