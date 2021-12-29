import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import List from "@material-ui/core/List";
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
  const [questions, setQuestions] = React.useState([""]);

  const handleTextChange = (qnIndex) => {
    return (e) => {
      questions[qnIndex] = e.target.value;
    };
  }

  const addQuestion = () => setQuestions((prev)=>{
    prev.forEach((str) => console.log(str));
    return [...prev, ""];
  });
  const removeQuestion = (qnIndex) => () => setQuestions((prev)=> {
    prev.forEach((str) => console.log(str));
    return prev.filter((qn, index) => index !== qnIndex)
  });
  
  function InputField(props) {
    return (
      <ul>
        <div>
          <TextField size="small" style ={{width: '80%', marginTop:'10px'}} required id="outlined-basic" label="Question" variant="outlined" onChange={handleTextChange(props.index)} />
          <IconButton onClick={addQuestion}><AddCircle /></IconButton>
          <IconButton onClick={removeQuestion(props.index)} disabled={questions.length === 1}><RemoveCircle /></IconButton>
        </div>
      </ul>
    )
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
          <TextField required id="outlined-basic" label="Form Name" variant="outlined" /><br></br>
        </ul>
        {questions.map((question, index) => {return <InputField question={question} index={index} />})}
      </List>
      <Button style ={{background: '#2B6AE2', margin: '40px', float: 'right', color: 'white'}} variant="contained">Submit</Button>
    </Paper>
  )
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

  function FormCheckBox(props) {
    return (
      <FormControlLabel 
        control={
          <Checkbox onChange={handleChange} name={props.name} checked={props.status}/>
        }
        label={props.name}
      />
    )
  }

  function handleSubmit() {
    forms.forEach((form) => {
      if (formState[form]) {
        formsToDelete.push(form);
      }
    });
    formsToDelete.forEach((del) => console.log(del));
  }

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
              forms.map((form) => {
                return <FormCheckBox name={form} status={formState[form]} />
              })
            }
          </FormGroup>
        </FormControl>
      </Paper>
      <Button style ={{background: '#2B6AE2', margin: '40px', float: 'right', color: 'white'}} variant="contained" type='submit' onClick={handleSubmit}>Submit</Button>
    </div>
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
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DropFormTab />
        </TabPanel>
      </Box>
    </div>
  );
}
