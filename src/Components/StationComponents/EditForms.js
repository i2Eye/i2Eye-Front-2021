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
          {children}
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function AddFormTab() {
  const [key, setKey] = React.useState(1);
  const [questions, setQuestions] = React.useState([{question: "", type: "text", key: 0}]);

  const handleQuestionChange = (qnIndex) => {
    return (e) => {
      e.persist();
      setQuestions((prev) => {
        const updated = prev.slice();
        console.log(updated);
        updated[qnIndex].question = e.target.value;
        console.log(updated[qnIndex].question + ' ' + updated[qnIndex].key);
        return updated;
      })
    };
  }

  const handleOptionChange = (qnIndex, opIndex) => {
    return (e) => {
      e.persist();
      setQuestions((prev) => {
        const updated = prev.slice();
        updated[qnIndex].options[opIndex].option = e.target.value;
        return updated;
      })
    }
  }

  const handleTypeChange = (qnIndex) => {
    return (e) => {
      setQuestions((prev) => {
        const newType = e.target.value;
        const updated = prev.slice();
        updated[qnIndex].type = newType;
        if (newType !== "text") {
          updated[qnIndex].optionCounter = 1;
          updated[qnIndex].options = [{option: "", key: 0}];
        }
        return updated;
      })
    }
  }

  const addQuestion = () => {
    setQuestions((prev) => [...prev, {question: "", type: "text", key: key}]);
    setKey(key + 1);
  };
  const removeQuestion = (qnIndex) => () => setQuestions((prev)=> {
    prev.forEach((str) => console.log(str));
    const updated = prev.slice();
    updated.splice(qnIndex, 1);
    return updated;
  });

  // for radio and checkbox types
  const addOption = (qnIndex) => () => setQuestions((prev) => {
      const updated = prev.slice();
      updated[qnIndex].options.push({option: "", key: updated[qnIndex].optionCounter});
      updated[qnIndex].optionCounter += 1;
      return updated;
    }
  );
  const removeOption = (qnIndex, opIndex) => () => setQuestions((prev) => {
      const updated = prev.slice();
      updated[qnIndex].options.splice(opIndex, 1);
      return updated;
    }
  );

  const handleSubmit = () => {
    const final = questions.slice();
    for (let i = 0; i < final.length; i++) {
      const questionHolder = final[i];
      questionHolder.key = i;
      if (questionHolder.type !== "text") {
        const optionsHolder = questionHolder.options;
        questionHolder.optionCounter = optionsHolder.length;
        for (let j = 0; j < optionsHolder.length; j++) {
          optionsHolder[j].key = j;
        }
      }
    }
    console.log(final);
  };

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
        <ul style={{marginBottom: 10}}>
          <TextField required id="outlined-basic" label="Form Name" variant="outlined" /><br></br>
        </ul>
        {questions.map((question, qnIndex) => (
          <ul key={question.key}>
            <div>
              <TextField size="small" style ={{width: '80%', marginTop:'10px'}} required id="outlined-basic" label="Question" variant="outlined" value={question.question} onChange={handleQuestionChange(qnIndex)} />
              <IconButton onClick={addQuestion}><AddCircle /></IconButton>
              <IconButton onClick={removeQuestion(qnIndex)} disabled={questions.length === 1}><RemoveCircle /></IconButton>
            </div>
            <FormControl  sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={question.type}
                onChange={handleTypeChange(qnIndex)}
                autoWidth
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="radio">Radio</MenuItem>
                <MenuItem value="checkbox">Checkbox</MenuItem>
              </Select>
            </FormControl>
            <List>
              {(question.type ==="radio" || question.type === "checkbox") && question.options.map((optionHolder, opIndex) => {
                return <OptionsField key={optionHolder.key} option={optionHolder.option} handleTextChange={handleOptionChange(qnIndex, opIndex)} disabled={question.options.length === 1} addOption={addOption(qnIndex)} removeOption={removeOption(qnIndex, opIndex)} />;
              })}
            </List>
          </ul>
        ))}
      </List>
      <Button style ={{background: '#2B6AE2', margin: '40px', float: 'right', color: 'white'}} variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>
    </Paper>
  )
}

function OptionsField(props) {
  return (
    <ul>
      <div>
        <TextField
          size="small"
          style={{ width: "50%", marginTop: "10px" }}
          required
          label="Option"
          variant="outlined"
          value={props.option}
          onChange={props.handleTextChange}
        />
        
        <IconButton onClick={props.addOption}>
          <AddCircle />
        </IconButton>
        <IconButton
          onClick={props.removeOption}
          disabled={props.disabled}
        >
          <RemoveCircle />
        </IconButton>
      </div>
    </ul>
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
  const forms = ["Registration", "BMI", "Doctor Consultation", "Familty History", "Oral Health"];
  const formInit = {};
  forms.forEach((formName) => formInit[formName] = false);

  const formsToDelete = [];
  const [formState, setForm] = React.useState(formInit);

  const handleChange = (event) => {
    setForm({
      ...formState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {
    forms.forEach((form) => {
      if (formState[form]) {
        formsToDelete.push(form);
      }
    });
    formsToDelete.forEach((del) => console.log(del));
  };

  return (
    <div>
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
          <FormGroup style={{paddingTop: 10}}>
            {
              forms.map((form, index) => {
                return <FormCheckBox key={index} name={form} status={formState[form]} handleChange={handleChange} />
              })
            }
          </FormGroup>
        </FormControl>
      </Paper>
      <Button style ={{background: '#2B6AE2', margin: '40px', float: 'right', color: 'white'}} variant="contained" type='submit' onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

function FormCheckBox(props) {
  return (
    <FormControlLabel 
      control={
        <Checkbox onChange={props.handleChange} name={props.name} checked={props.status}/>
      }
      label={props.name}
    />
  )
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add" {...a11yProps(0)} />
          <Tab label="Update" {...a11yProps(1)} />
          <Tab label="Drop" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <h1>Edit Forms</h1>
      <Box sx={{ width: '100%' }}>
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