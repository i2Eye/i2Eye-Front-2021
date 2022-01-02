/* eslint-disable default-case */
import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Data from "./StationTestData.json";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function readJsonData() {
  var stationsArray = [];

  for (var i = 0; i < Data.length; i++) {
    var isAvailable = (Data[i].available.toLowerCase() === "true");
    stationsArray.push({ name: Data[i].stationName, tag: Data[i].tag, checked: isAvailable });
  }

  return stationsArray;
}

class StationSelect extends Component {
  state = {
    stations: readJsonData(),
  };

  /* Takes in an index to find which station to handle. The event prop is automatically passed in through onChange and the state is updated */
  handleToggle = (index) => (event) => {
    const newStations = [...this.state.stations];
    const changedStation = { ...newStations[index] }; //deep copies
    changedStation.checked = event.target.checked; // change the checked value to that given by the onChange event
    newStations[index] = changedStation; //reassigns to appropriate index
    this.setState({ stations: newStations }); //sets state
  };

  render() {
    const { stations } = this.state;
    const { classes } = this.props;

    return (
      //using map to render so that we only have to change the stations state property
      <Paper className={classes.root} style={{ overflow: "hidden" }}>
        <List className={classes.root}>
          {stations.map((station, index) => (
            <ListItem
              key={index}
              button
              disabled={!station.checked} //handles the check if the station is off
              component={Link}
              to={`/stations/patient_search/${encodeURIComponent(station.name)}`}
            >
              <ListItemText id={station.name} primary={station.name} />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={this.handleToggle(index)}
                  checked={station.checked}
                  inputProps={{ "aria-labelledby": "switch-list-label-1" }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(StationSelect);
