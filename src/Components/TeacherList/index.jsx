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
    fetch(Admin_URL + "getteachers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userJwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.teachers) {
          setUserlist(data.teachers);
          setDisplayList(data.teachers.slice(0, 10));
          setTotalPage(
            data.teachers.length / 10 +
              (data.teachers.length % 10 === 0 ? 0 : 1)
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

  const handleDelete = (id) => {
    fetch(Admin_URL + "deleteteacher/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userJwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Teacher deleted successfully");
          document.getElementById("closemodal" + id).click();
          setUserlist(userlist.filter((user) => user._id !== id));
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const renderTable = () => {
    return displaylist.map((user, idx) => {
      // console.log(user);
      return (
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target={"#examteacherdelete" + user._id}
              class="close"
            >
              <span aria-hidden="true">
                <i class="fa-solid fa-trash"></i>
              </span>
            </button>
            <div id={"examteacherdelete" + user._id} class="modal fade">
              <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                  <div class="modal-header flex-column">
                    <div class="icon-box">
                      <i class="fa-solid fa-trash"></i>
                    </div>
                    <h4 class="modal-title w-100">Are you sure?</h4>
                    <button
                      type="button"
                      class="close"
                      data-bs-dismiss="modal"
                      aria-hidden="true"
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>
                      Delete this teacher? <br /> All the questions added by the
                      teacher will also be deleted.
                    </p>
                  </div>
                  <div class="modal-footer justify-content-center">
                    <button
                    id={"closemodal" + user._id}
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      type="button"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="userlist-page flex-column align-items-center d-flex justify-content-center">
      <div className="white-header">
        <h1>Teacher List</h1>
      </div>
      <div className="white-box">
        <div class="">
          <div class="myexamtable">
            <table class="table table-responsive-xl">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>{renderTable()}</tbody>
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
