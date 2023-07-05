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

  const [questionlist, setQuestionList] = React.useState([]);
  const [displaylist, setDisplayList] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  React.useEffect(() => {
    fetch(Admin_URL + "getquestions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userJwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.allquestions) {
          setQuestionList(data.allquestions);
          setDisplayList(data.allquestions.slice(0, 25));
          setTotalPage(
            data.allquestions.length / 25 +
              (data.allquestions.length % 25 === 0 ? 0 : 1)
          );
          setPage(1);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [userJwt]);

  const handleDelete = (id) => {
    fetch(Admin_URL + "deletequestion/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userJwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          setQuestionList(questionlist.filter((item) => item._id !== id));
          setTotalPage(
            questionlist.length / 25 + (questionlist.length % 25 === 0 ? 0 : 1)
          );
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  React.useEffect(() => {
    setDisplayList(questionlist.slice((page - 1) * 25, page * 25));
  }, [page, questionlist]);

  const handlepage = (pa) => {
    setPage(pa);
  };

  const handleNext = () => {
    if (page < totalPage) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const renderList = () => {
    return displaylist.map((item, idx) => {
      return (
        <div class="accordion-item" key={idx}>
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapseOne" + item._id}
              aria-expanded="false"
            >
              {item.question}
            </button>
          </h2>
          <div
            id={"collapseOne" + item._id}
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <ul>
                <li>
                  <strong>Added by:</strong> {item.addBy.name}
                </li>
                <li>
                  <strong>ITI Trade:</strong> {item.itiTrade}
                </li>
                <li>
                  <strong>Option 1:</strong> {item.option1}
                </li>
                <li>
                  <strong>Option 2:</strong> {item.option2}
                </li>
                <li>
                  <strong>Option 3:</strong> {item.option3}
                </li>
                <li>
                  <strong>Option 4:</strong> {item.option4}
                </li>
                <li>
                  <strong>Answer:</strong> {item.answer}
                </li>
              </ul>
              <div className="d-flex">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
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

  return (
    <div className="userlist-page flex-column align-items-center d-flex justify-content-center">
      <div className="white-header">
        <h1>Ouestion List</h1>
      </div>
      <div className="white-box">
        <div class="accordion" id="accordionExample">
          {renderList()}
        </div>
      </div>
      <div className="bottom-btns">
        <div class="myexampagi">
          <ul class="pagination flex-wrap">
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
