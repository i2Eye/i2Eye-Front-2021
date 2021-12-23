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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [questions, setQuestions] = React.useState([0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addQuestion = () => setQuestions((prev)=>[...prev, 0]);
  const removeQuestion = () => setQuestions((prev)=>prev.slice(0,-1));

  return (
    <div>
    <h1>Edit Forms</h1>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add" {...a11yProps(0)} />
          <Tab label="Update" {...a11yProps(1)} />
          <Tab label="Drop" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Paper
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 20,
              }}
        >
            <List>
            <TextField required id="outlined-basic" label="Form Name" variant="outlined" /><br></br>
          {questions.map((question, index) => (
            <div>
            <TextField size="small" style ={{width: '80%', marginTop:'10px'}} required id="outlined-basic" label="Question" variant="outlined" />
            <IconButton onClick={addQuestion}><AddCircle /></IconButton>
            <IconButton onClick={removeQuestion} disabled={questions.length===1}><RemoveCircle /></IconButton></div>))}
        </List>
        <Button style ={{background: '#2B6AE2', margin: '40px', float: 'right', color: 'white'}} variant="contained">Submit</Button>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
    </div>
  );
}
