import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import getTestQuestions from "../../../TestQuestions"
import "../../../dbFunctions";
import { updatePatientData, getPatient } from "../../../dbFunctions";
import ErrorSnackbar from "./ErrorSnackbar";

var data;

class Fingerstick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorPresent : false
    };
    data = getTestQuestions().fingerstickAnemia;
    for (let i = 0; i < data.length; i++) {
      this.state[data[i].question] = "";
    }
  
  }

  async componentDidMount() {
    const data = getPatient(this.props.id).then((response) => {
      const res = response["Fingerstick Blood Test (Anemia)"];
      for (let i = 0; i < res.length; i++) {
        this.setState({[res[i].question]: res[i].answers})
      }
    });
  }

  handleRadioChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }


  handleSubmit() {
    const answers = {"Fingerstick Blood Test (Anemia)": []};
  
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

            answers["Fingerstick Blood Test (Anemia)"].push(result);

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
          Fingerstick Blood Test (Anemia)
        </h1>
        <form>
          <ol>
            {data.map((question) => {
              if (question.type === "text") {
                return (<div key={question.question}>
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
                        required = {question.required}
                      >
                        {question.question}
                      </InputLabel>
                      <TextField
                        id={question.question}
                        onChange={this.handleChange.bind(this)}
                        type="number"
                        label={question.question}
                        value={this.state[question.question]}
                      />
                    </span>
                  </li>
                </div>
                  )
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

export default Fingerstick;
