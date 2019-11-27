import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const SERVER_URL = "http://localhost:3000/projects/1"

let URL = (model, id = '') => {
  return `http://localhost:3000/${model}/${id}`
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default function Task(props) {
  const classes = useStyles();
  const [task, setTask] = useState(props.task)
  const updateTaskName = () => {
    axios.put(URL('tasks', props.id), { name: task, group_id: props.group_id })
  }

  return (
    <tr>
      <td>
          <button onClick={(event) => props.deleteTask(event, props.group, props.task)}>Delete Task</button>
          <TextField
              onChange={(event) => setTask(event.target.value)}
              onBlur={updateTaskName}
              id="filled-read-only-input"
              value={task.name}
              className={classes.textField}
              margin="normal"
              variant="outlined"
          />
      </td>
      <td>
          <TextField
              id="filled-read-only-input"
              value={props.task.owner}
              className={classes.textField}
              margin="normal"
              variant="outlined"
          />
      </td>
      <td>
          <TextField
              id="filled-read-only-input"
              value={props.task.status}
              className={classes.textField}
              margin="normal"
              variant="outlined"
          />
      </td>
      <td>
          <TextField
              id="filled-read-only-input"
              value={new Date(props.task.due_date)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
          />
      </td>
      <td>
          <TextField
              id="filled-read-only-input"
              value={props.task.priority}
              className={classes.textField}
              margin="normal"
              variant="outlined"
          />
      </td>
    </tr>
  )
}