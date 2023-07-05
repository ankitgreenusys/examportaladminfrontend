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
      navigate("/adminlogin");
    }
  }, [userJwt, user]);

  const [userlist, setUserlist] = React.useState([]);
  const [displaylist, setDisplayList] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  React.useEffect(() => {
    fetch(Admin_URL + "getscores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userJwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.users) {
          setUserlist(data.users);
          setDisplayList(data.users.slice(0, 10));
          setTotalPage(
            data.users.length / 10 + (data.users.length % 10 === 0 ? 0 : 1)
          );
          setPage(1);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  React.useEffect(() => {
    setDisplayList(userlist.slice((page - 1) * 10, page * 10));
  }, [page, userlist]);

  const handlepage = (pa) => {
    setPage(pa);
  };

  const handleNext = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const renderPagination = () => {
    let arr = [];
    for (let i = 1; i <= totalPage; i++) {
      arr.push(
        <>
          <li class="page-item">
            <span class="page-link" onClick={() => handlepage(i)}>
              {i}
            </span>
          </li>
        </>
      );
    }
    return arr;
  };

  const renderList = () => {
    return displaylist.map((item, idx) => {
      console.log(item);
      return (
        <tr key={idx}>
          <td class="d-flex align-items-center">
            <div class="pl-3 email">
              <span>{item.name}</span>
              <span>{item.email}</span>
            </div>
          </td>
          <td>{item.phoneNumber}</td>
          <td>{item.itiTrade}</td>
          <td>{item.test.currentQuestion}</td>
          <td>{item.test.currentTimer}</td>
          <td>{item.test.score}</td>
        </tr>
      );
    });
  };

  return (
    <div className="userlist-page flex-column align-items-center d-flex justify-content-center">
      <div className="white-header">
        <h1> Results </h1>
      </div>
      <div className="white-box">
        <div class="">
          <div class="myexamtable">
            <table class="table table-responsive-xl">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone No.</th>
                  <th>ITI Trade</th>
                  <th>On question</th>
                  <th>Time Left</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>{renderList()}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bottom-btns">
        <div class="myexampagi">
          <ul class="pagination">
            <li class="page-item">
              <span class="page-link" onClick={() => handlePrev()}>
                Previous
              </span>
            </li>
            {renderPagination()}
            <li class="page-item">
              <span class="page-link" onClick={() => handleNext()}>
                Next
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
