import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
//import FormSegment from "./FormSegment";
import InfoSegment from "./InfoSegment";
import GeneralForm from "./StationForms/GeneralForm";

class FormAbled extends Component {
  state = {};

  forms = { "Oral Health": OralHealth,
            "BMI and Abdominal Obesity": BMI,
            "Eye Screening": EyeScreening,
            "Phlebotomy Test": Phlebotomy,
            "Fingerstick Blood Test": FingerstickAnemia,
            "Doctor Consult": Doctor,
            "Fingerstick Test (RCBG)": Fingerstick,
            "Blood Pressure Test": BloodPressure};

  handleChange(e) {
    this.props.onChange();
  }

  render() {
    const { stationName } = this.props;
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item md={7}>
            <Paper
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 20,
              }}
            >
              <GeneralForm
                id={this.props.id}
                onChange={this.handleChange.bind(this)}
                state={this.props.state}
                stationName={stationName}
              />
            </Paper>
          </Grid>
          <Grid item md={5}>
            <Paper
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 20,
              }}
            >
              <InfoSegment id={this.props.id} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FormAbled;
