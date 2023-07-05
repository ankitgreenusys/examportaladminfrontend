import React from "react";

import Admin_URL from "./Common/Admin.url";
import Teacher_URL from "./Common/Teacher.url";

const AppContext = React.createContext({});

const Context = ({ children }) => {
  const userType = localStorage.getItem("usertype") || "";
  const tokenData = localStorage.getItem("token") || "";
  const [user, setUser] = React.useState(null);
  const [userJwt, setUserJwt] = React.useState(tokenData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);

    if (tokenData && userType) {
      // console.log("tokenData", tokenData);
      let url = "";
      if (userType === "admin") url = Admin_URL;
      else if (userType === "teacher") url = Teacher_URL;
      else {
        setUser(null);
        setUserJwt(null);
        setIsLoading(false);
        localStorage.removeItem("token");
        localStorage.removeItem("usertype");
        return;
      }
      fetch(url + "getprofile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userJwt,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.user && data.user._id) {
            setUser(data.user);
            setUserJwt(tokenData);
          } else {
            setUser(null);
            setUserJwt(null);
            localStorage.removeItem("token");
            localStorage.removeItem("usertype");
          }
        })
        .catch((err) => {
          setUser(null);
          setUserJwt(null);
          localStorage.removeItem("token");
          localStorage.removeItem("usertype");
        });
    }
    setIsLoading(false);
  }, [userJwt]);

  const login = (data, usertype) => {
    // console.log(data);
    setIsLoading(true);
    setError(null);
    setUser(null);
    setUserJwt(null);

    let url = "";

    if (usertype === "teacher") url = Teacher_URL;
    else if (usertype === "admin") url = Admin_URL;
    else {
      setError("Invalid User Type");
      setIsLoading(false);
      return;
    }

    const sndta = {
      email: data.email,
      password: data.password,
    };
    fetch(url + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sndta),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setUserJwt(data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("usertype", usertype);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
    setIsLoading(false);
  };

  const logout = () => {
    // console.log(user);
    setUser(null);
    setUserJwt(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
  };

  return (
    <AppContext.Provider
      value={{ login, logout, user, userJwt, isLoading, error }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
export { AppContext };
