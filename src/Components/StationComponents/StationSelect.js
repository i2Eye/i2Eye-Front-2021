/* eslint-disable default-case */
import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Data from "./StationTestData.json";
import { getStationAvailability } from "../../dbFunctions";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class StationSelect extends Component {
  state = {
    stations: [],
  };

  /** Reads station names and tags from json file */
  constructor(props) {
    super(props);
    var stationsArray = [];

    for (var i = 0; i < Data.length; i++) {
      stationsArray.push({
        name: Data[i].stationName,
        tag: Data[i].tag,
        checked: false, // Stations all set as unavailable first
      });
    }
    this.state = { stations: stationsArray };
  }

  /** Updates the availability of each station using data from backend */
  getAvailabilities = () => {
    const availabilityPromise = getStationAvailability();
    const promisedAvailabilities = availabilityPromise.then((result) => {
      return result;
    });

    const newStations = [...this.state.stations];
    const setAvailabilities = async () => {
      const actualAvailabilities = await promisedAvailabilities;
      for (var i = 0; i < Data.length; i++) {
        newStations[i].checked = actualAvailabilities[newStations[i].name];
      }
      this.setState({ stations: newStations });
    };
    setAvailabilities();
  };

  componentDidMount() {
    this.getAvailabilities();
  }

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
              to={`/stations/patient_search/${station.tag}`}
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
