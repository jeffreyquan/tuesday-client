import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Select from './Select'
// import moment from 'moment';
// import {DatetimePicker, DatetimePickerTrigger, DatetimeRangePicker } from 'rc-datetime-picker';
// import 'rc-datetime-picker/dist/picker.css';
import Collapsible from './partial/Collapsible.js'

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

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
  // const [moment, setMoment] = useState(moment)

  // const shortcuts = {
  //   'Today': moment(),
  //   'Yesterday': moment().subtract(1, 'days'),
  //   'Clear': ''
  // };

  const updateTaskName = () => {
    axios.put(URL('tasks', props.id), { name: task, group_id: props.group_id })
  }

  const updateStatus = (status) => {
    axios.put(URL('tasks', props.id), { status, group_id: props.group_id })
  }

  const updatePriority = (priority) => {
    axios.put(URL('tasks', props.id), { priority, group_id: props.group_id })
  }

  const updateOwner = () => {
    axios.put(URL('tasks', props.id), { owner: owner, group_id: props.group_id })
  }

  return (

    <tr style={{borderBottom: "1px solid #F1F1F1"}}>
        <td style={{width: '1em'}}>
        <button onClick={(event) => props.deleteTask(event, props.group, props.task)}><DeleteOutlineOutlinedIcon/></button>
        </td>
      <td>
          <input
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
          <input
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
              onChange={(event) => { setTaskStatus(event.target.value); updateStatus(event.target.value) }}
          />
      </td>
      <td>
          {/*<DatetimeRangePicker
              showTimePicker={true}
              moment={moment()}
              onChange={(moment => setMoment(moment))}
              input type='text' value={moment.format("MMM Do")}
          />*/}
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
              onChange={(event) => { setTaskPriority(event.target.value); updatePriority(event.target.value) }}
          />
      </td>
    </tr>
  )
}
