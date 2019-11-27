import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Select from './Select'

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
  const [statusOptions, setStatusOptions] = useState(['Done', 'Working On It', 'Stuck'])
  const [taskStatus, setTaskStatus] = useState(props.task.status)
  const [priorityOptions, setPriorityOptions] = useState(['High', 'Medium', 'Low'])
  const [taskPriority, setTaskPriority] = useState(props.task.priority)
  const [owner, setOwner] = useState(props.task.owner)

  const updateTaskName = () => {
    axios.put(URL('tasks', props.id), { name: task, group_id: props.group_id })
  }

  const updateStatus = () => {
    axios.put(URL('tasks', props.id), { status: taskStatus, group_id: props.group_id })
  }

  const updatePriority = () => {
    axios.put(URL('tasks', props.id), { priority: taskPriority, group_id: props.group_id })
  }

  const updateOwner = () => {
    axios.put(URL('tasks', props.id), { owner: owner, group_id: props.group_id })
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
              onChange={(event) => setOwner(event.target.value)}
              onBlur={updateOwner}
              id="filled-read-only-input"
              value={owner}
              className={classes.textField}
              margin="normal"
              variant="outlined"
          />
      </td>
      <td>
          <Select
              name={'status'}
              options={statusOptions}
              value={taskStatus}
              placeholder={''}
              onChange={(event => setTaskStatus(event.target.value))}
              onBlur={updateStatus}
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
          <Select
              name={'priority'}
              options={priorityOptions}
              value={taskPriority}
              placeholder={''}
              onChange={(event => setTaskPriority(event.target.value))}
              onBlur={updatePriority}
          />
      </td>
    </tr>
  )
}