import React from "react";
import "./Styles.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";

import Teacher_URL from "../../Common/Teacher.url";
import itiTrade from "../../Common/ItiTrade.array";

const Index = () => {
  const navigate = useNavigate();
  const { user, userJwt } = React.useContext(AppContext);

  React.useEffect(() => {
    if (!userJwt || !user) {
      navigate("/login");
    }
  }, [userJwt, user, navigate]);

  const [question, setQuestion] = React.useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    ititrade: "",
    answer: "",
  });

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setQuestion({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      ititrade: "",
      answer: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.question) {
      toast.error("Please enter question");
      return;
    }
    if (
      !question.option1 ||
      !question.option2 ||
      !question.option3 ||
      !question.option4
    ) {
      toast.error("Please enter all options");
      return;
    }
    if (!question.ititrade) {
      toast.error("Please select trade");
      return;
    }

    const sndta = {
      question: question.question,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      answer: question.answer,
      ititrade: itiTrade[question.ititrade],
    };

    fetch(Teacher_URL + "addquestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userJwt}`,
      },
      body: JSON.stringify(sndta),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          toast.success("Question added successfully");
          handleClear();
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="addques-page flex-column align-items-center d-flex justify-content-center">
      <div className="white-header">
        <h1>Add Questions</h1>
      </div>
      <div className="white-box">
        <div className="">
          <div className="addquesform">
            <h5 className="mb-2">Question:</h5>
            <textarea
              className="form-control"
              rows="3"
              name="question"
              value={question.question}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="mt-4">
          <div className="addquesform">
            <h5 className="mb-2">Select Trade:</h5>
          </div>
          <div className="addquesform my-3">
            <select
              onChange={handleChange}
              name="ititrade"
              className="form-select mt-3"
              required
            >
              <option defaultValue hidden>
                ITI Trade
              </option>
              {itiTrade.map((trade, idx) => (
                <option key={idx} value={idx}>
                  {trade}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <div className="addquesform">
            <h5 className="mb-2">Add Options:</h5>
          </div>
          <div className="addquesform my-3">
            <input
              className="form-control"
              type="text"
              placeholder="Option 1"
              name="option1"
              value={question.option1}
              onChange={handleChange}
            />
          </div>
          <div className="addquesform my-3">
            <input
              className="form-control"
              type="text"
              placeholder="Option 2"
              name="option2"
              value={question.option2}
              onChange={handleChange}
            />
          </div>
          <div className="addquesform my-3">
            <input
              className="form-control"
              type="text"
              placeholder="Option 3"
              name="option3"
              value={question.option3}
              onChange={handleChange}
            />
          </div>
          <div className="addquesform my-3">
            <input
              className="form-control"
              type="text"
              placeholder="Option 4"
              name="option4"
              value={question.option4}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="addquesform">
            <h5 className="mb-2">Select Answer:</h5>
          </div>
          <div className="addquesform my-3">
            <select
              onChange={handleChange}
              name="answer"
              className="form-select mt-3"
              required
            >
              <option defaultValue hidden>
                Answer
              </option>
              <option value={question.option1}>Option 1</option>
              <option value={question.option2}>Option 2</option>
              <option value={question.option3}>Option 3</option>
              <option value={question.option4}>Option 4</option>
            </select>
          </div>
        </div>
      </div>
      <div className="detailsbtns bottom-btns">
        <button onClick={handleClear} className="exambtn btn-warning">
          Clear
        </button>
        <button onClick={handleSubmit} className="exambtn btn-green">
          Add Question
        </button>
      </div>
    </div>
  );
};

export default Index;
