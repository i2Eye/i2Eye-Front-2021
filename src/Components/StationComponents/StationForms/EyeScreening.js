import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import getTestData from "../../../TestData";
import getTestQuestions from "../../../TestQuestions"
import "../../../dbFunctions";
import { updatePatientData, getPatient } from "../../../dbFunctions";
import Success from "./Success";
import ErrorSnackbar from "./ErrorSnackbar";

const questions = [{ question: "SNC ID" }];

var data;
class EyeScreening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorPresent : false
    };
    data = getTestQuestions().eyeScreening;
    for (let i = 0; i < data.length; i++) {
      this.state[data[i].question] = "";
    }
  }

  async componentDidMount() {
    const data = getPatient(this.props.id).then((response) => {
      const res = response["Eye Screening"];
      for (let i = 0; i < res.length; i++) {
        this.setState({[res[i].question]: res[i].answers})
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.label]: e.target.value });
  }

  handleRadioChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit() {
    const answers = {"Eye Screening": []};
  
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

            answers["Eye Screening"].push(result);

      }

      updatePatientData(this.props.id, answers).then((response) =>
        this.setState({ errorPresent: false }, () => {
          if (response === false) {
            this.setState({ errorPresent: true });
          } else {
            this.props.onChange();
          }
        })
      );
  }

  renderOptions(item) {
    return <FormControlLabel
    key = {item}
    value= {item}
    control={<Radio />}
    label= {item}
  />
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
          Eye Screening
        </h1>
        <form>
          <ol>
            {data.map((question) => {
              if (question.type === "text") {
                return (
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
                      required={question.required}
                    >
                      {question.question}
                    </InputLabel>
                    <TextField
                      key={question.question}
                      onChange={this.handleChange.bind(this)}
                      name="search"
                      type="text"
                      label={question.question}
                      value={this.state[question.question]}
                    />
                    <p />
                  </span>
                </li>
              </div>)
              }

              if (question.type === "radio") {
                return (
              <div key={question.question}>
                <li
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    fontWeight: "normal",
                  }}
                >
                  <FormControl component="fieldset">
                    <FormLabel
                      component="legend"
                      style={{ fontSize: 22, color: "black" }}
                      required = {question.required}
                    >
                      {question.question}
                    </FormLabel>
                    <RadioGroup
                      aria-label="frequency"
                      name={question.question}
                      onChange={this.handleRadioChange.bind(this)}
                      value={this.state[question.question]}
                    >
                      {question.options.map(x => this.renderOptions(x))}
                    </RadioGroup>
                  </FormControl>
                  <p />
                </li>
              </div>
            )}})}

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

export default EyeScreening;
