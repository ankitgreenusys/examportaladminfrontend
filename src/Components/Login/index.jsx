import React from "react";
import "./Styles.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";

const Index = (props) => {
  const navigate = useNavigate();
  const { login, isLoading, error, user } = React.useContext(AppContext);

  React.useEffect(() => {
    if (!isLoading) {
      if (user && user._id) {
        toast.success("Welcome " + user.name);
        navigate("/");
      }

      if (error) toast.error(error);
    }
  }, [user, isLoading, error]);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    login(formData, props.type);
  };

  return (
    <div className="loginpage">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
            <div class="col-lg-12 login-key mt-2">
              <i class="fa-solid fa-key"></i>
            </div>
            <div class="col-lg-12 login-title">{props.type} panel</div>
            <div class="col-lg-12 login-form">
              <div class="col-lg-12 login-form">
                <form onSubmit={handlesubmit}>
                  <div class="form-group">
                    <label class="form-control-label">USERNAME</label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handlechange}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">PASSWORD</label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handlechange}
                    />
                  </div>
                  <div class="col-lg-12 loginbttm">
                    <div class="col-lg-6 login-btm login-text"></div>
                    <div class="col-lg-6 login-btm login-button">
                      <button type="submit" class="btn btn-outline-primary">
                        LOGIN
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
