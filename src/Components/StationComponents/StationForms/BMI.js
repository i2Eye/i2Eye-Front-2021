import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { updatePatientData, getPatient } from "../../../dbFunctions";
import ErrorSnackbar from "./ErrorSnackbar";
import getTestQuestions from "../../../TestQuestions";

const questions = [
  { question: "Height (m)", id: "height" },
  { question: "Weight (kg)", id: "weight" },
  { question: "Waist circumference (cm)", id: "waist" },
];

var data;
class BMI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorPresent : false
    };
    data = getTestQuestions().BMI;
    for (let i = 0; i < data.length; i++) {
      this.state[data[i].question] = "";
    }
  }

  async componentDidMount() {
    const data = getPatient(this.props.id).then((response) => {
      const res = response["BMI"];
      for (let i = 0; i < res.length; i++) {
        this.setState({[res[i].question]: res[i].answers})
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    const answers = {BMI : []};

    for (let i = 0; i < data.length; i++) {
      if (data[i].required) {
        if (!this.state[data[i].question]) {
          alert("Required fields cannot be left empty!");
          return;
        }
      }

      const result  = {
        answers: this.state[data[i].question],
        num: i + 1,
        question: data[i].question,
      }

      answers.BMI.push(result);
    }

      updatePatientData(this.props.id, answers).then((response) => {
        this.setState({errorPresent: false}, () => {
          if (response === false) {
            this.setState({ errorPresent: true });
          } else {
            this.props.onChange();
          }
        })
      });
    }

  render() {
    return (
      <div>
        {this.state.errorPresent && (
          <ErrorSnackbar
            message={"Connection error, please submit form again"}
          />
        )}
        <h1 style={{ fontFamily: "sans-serif", fontSize: 30 }}>
          BMI & Abdominal Obesity
        </h1>
        <form>
          <ol>
            {data.map((question) => (
              <div key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <span>
                    <InputLabel
                      style={{ fontSize: 22, color: "black" }}
                      size="large"
                      required = {question.required}
                    >
                      {question.question}
                    </InputLabel>
                    <TextField
                      key={question.question}
                      id={question.question}
                      onChange={this.handleChange.bind(this)}
                      label={question.question}
                      type="number"
                      style={{ width: "250px" }}
                      //defaultValue={this.state.height}
                      value={this.state[question.question]}
                    />
                    <p />
                  </span>
                </li>
              </div>
            ))}
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={this.handleSubmit.bind(this)}
            >
              Submit
            </Button>
          </ol>
        </form>
      </div>
    );
  }
}

export default BMI;
