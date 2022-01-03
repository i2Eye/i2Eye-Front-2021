import * as React from "react";
import PropTypes from "prop-types";
import {
  Tab,
  Tabs,
  Typography,
  Box,
  Paper,
  TextField,
  IconButton,
  List,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  ListItem,
  ListItemText,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import Data from "./StationTestData.json";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AddFormTab() {
  const [questions, setQuestions] = React.useState([""]);

  const handleTextChange = (qnIndex) => {
    return (e) => {
      questions[qnIndex] = e.target.value;
    };
  };

  const addQuestion = () =>
    setQuestions((prev) => {
      prev.forEach((str) => console.log(str));
      return [...prev, ""];
    });

  const removeQuestion = (qnIndex) => () =>
    setQuestions((prev) => {
      prev.forEach((str) => console.log(str));
      return prev.filter((qn, index) => index !== qnIndex);
    });

  function InputField(props) {
    return (
      <ul>
        <div>
          <TextField
            size="small"
            style={{ width: "50%", marginTop: "10px" }}
            required
            id="outlined-basic"
            label="Question"
            variant="outlined"
            defaultValue={props.value}
            onChange={handleTextChange(props.index)}
          />
          {console.log(props.value)}
          
          <IconButton onClick={addQuestion}>
            <AddCircle />
          </IconButton>
          <IconButton
            onClick={removeQuestion(props.index)}
            disabled={questions.length === 1}
          >
            <RemoveCircle />
          </IconButton>
          <BasicSelect />
        </div>
      </ul>
    );
  }

  return (
    <Paper
      style={{
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20,
      }}
    >
      <List>
        <ul>
          
          <TextField
            required
            id="outlined-basic"
            label="Form Name"
            variant="outlined"
          />
          <br></br>
        </ul>
        {questions.map((question, index) => {
          return <InputField question={question} index={index} value={questions[index]}/>;
        })}
      </List>
      <Button
        style={{
          background: "#2B6AE2",
          margin: "40px",
          float: "right",
          color: "white",
        }}
        variant="contained"
      >
        Submit
      </Button>
    </Paper>
  );
}

function UpdateFormTab() {
  const registration = {
    stationName: "Registration",
    tag: "registration",
    available: "false",
  };

  /** Read station names and tags from json file */
  const stations = [];
  const getStations = () => {
    for (var i = 0; i < Data.length; i++) {
      stations.push({
        name: Data[i].stationName,
        tag: Data[i].tag,
        checked: false, // Availabilities unimportant here, set to false.
      });
    }
  };
  getStations();

  var i; // For registration form index (used below)

  return (
    <Paper
      style={{
        paddingTop: 20,
        paddingBottom: 2,
      }}
    >
      <FormLabel
        style={{
          paddingLeft: 30,
        }}
        component="legend"
      >
        Select form to update
      </FormLabel>
      <List>
        <ListItem
          style={{
            paddingTop: 4,
            paddingLeft: 30,
          }}
          key={i + 1}
          button
          component={Link}
          to={`/edit_forms/${registration.tag}`}
        >
          <ListItemText
            id={registration.stationName}
            primary={registration.stationName}
          />
        </ListItem>
        {stations.map(
          (station, index) => (
            (i = index),
            (
              <ListItem
                style={{
                  paddingTop: 4,
                  paddingLeft: 30,
                }}
                key={index}
                button
                component={Link}
                to={`/edit_forms/${station.tag}`}
              >
                <ListItemText id={station.name} primary={station.name} />
              </ListItem>
            )
          )
        )}
      </List>
    </Paper>
  );
}

function DropFormTab() {
  const forms = [
    "Registration",
    "BMI",
    "Doctor Consultation",
    "Familty History",
    "Oral Health",
  ];
  // const formInit = {};
  // forms.forEach((formName) => formInit[formName] = false);
  let formsToDelete = [];
  // const [formState, setForm] = React.useState(formInit);

  // const handleChange = (event) => {
  //   setForm({
  //     ...formState,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  const handleChange = (event) => {
    if (event.target.checked) {
      formsToDelete.push(event.target.name);
    } else {
      formsToDelete = formsToDelete.filter(
        (form) => form !== event.target.name
      );
    }
    formsToDelete.forEach((name) => console.log(name));
  };

  function FormCheckBox(props) {
    return (
      <FormControlLabel
        control={<Checkbox onChange={handleChange} name={props.name} />}
        label={props.name}
      />
    );
  }

  return (
    <Paper
      style={{
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20,
      }}
    >
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Select forms to drop</FormLabel>
        <FormGroup>
          {forms.map((form) => {
            return <FormCheckBox name={form} key={form}/>;
          })}
        </FormGroup>
      </FormControl>
      <Button
        style={{
          background: "#2B6AE2",
          margin: "40px",
          float: "right",
          color: "white",
        }}
        variant="contained"
      >
        Submit
      </Button>
    </Paper>
  );
}

function BasicSelect() {
  const [type, setType] = React.useState("text");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const [questions, setQuestions] = React.useState([""]);

  const handleTextChange = (qnIndex) => {
    return (e) => {
      let current = questions;
      current[qnIndex] = e.target.value;
      setQuestions(current);
    };
  };

  const addQuestion = () =>
    setQuestions((prev) => {
      prev.forEach((str) => console.log(str));
      return [...prev, ""];
    });
  const removeQuestion = (qnIndex) => () =>
    setQuestions((prev) => {
      prev.forEach((str) => console.log(str));
      return prev.filter((qn, index) => index !== qnIndex);
    });

  function InputField(props) {
    return (
      <ul>
        <div>
          <TextField
            size="small"
            style={{ width: "50%", marginTop: "10px" }}
            required
            id={props.index}
            label="Option"
            variant="outlined"
            onChange={handleTextChange(props.index)}
          />
          
          <IconButton onClick={addQuestion}>
            <AddCircle />
          </IconButton>
          <IconButton
            onClick={removeQuestion(props.index)}
            disabled={questions.length === 1}
          >
            <RemoveCircle />
          </IconButton>
        </div>
      </ul>
    );
  }

  return (
    <Box>
      <FormControl  sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Age"
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="radio">Radio</MenuItem>
          <MenuItem value="checkbox">Checkbox</MenuItem>
        </Select>
      </FormControl>
      {type ==="radio" && questions.map((question, index) => {
          return <InputField question={question} index={index} />;
        })}
      {type==="checkbox" && questions.map((question, index) => {
          return <InputField question={question} index={index} />;
        })}
    </Box>
  );
}


export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Add" {...a11yProps(0)} />
          <Tab label="Update" {...a11yProps(1)} />
          <Tab label="Drop" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <h1>Edit Forms</h1>
      <Box sx={{ width: "100%" }}>
        <TabPanel value={value} index={0}>
          <AddFormTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UpdateFormTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DropFormTab />
        </TabPanel>
      </Box>
    </div>
  );
}
