import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles} from '@material-ui/core/styles';
import SelectWrap from './partial/Select'
import Collapsible from './partial/Collapsible.js'
import moment from 'moment';
import { DatetimePicker, DatetimePickerTrigger, DatetimeRangePicker  } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import styled from 'styled-components';

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
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    width: 200,
  },
  selectWrap: {
      padding: theme.spacing(0),
  }

}));



export default function Task(props) {
  const classes = useStyles();
  const [task, setTask] = useState(props.task)
  const [statusOptions, setStatusOptions] = useState(['Done', 'Working On It', 'Stuck'])
  const [taskStatus, setTaskStatus] = useState(props.task.status)
  const [priorityOptions, setPriorityOptions] = useState(['High', 'Medium', 'Low'])
  const [taskPriority, setTaskPriority] = useState(props.task.priority)
  const [owner, setOwner] = useState(props.task.owner)
  const [date, setDate] = useState(moment(props.task.due_date))

  const shortcuts = {
    'Today': moment(),
    'Yesterday': moment().subtract(1, 'days'),
    'Clear': ''
  };

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

  const updateDate = (date) => {
    console.log('date', date);

    axios.put(URL('tasks', props.id), { due_date: date, group_id: props.group_id })
  }

  const Button = styled.button`
    color: transparent;
    background-color: transparent;

    &:hover {
        color: black;
    }
  `;

  const Tr = styled.tr`

    &:hover {
        background-color:#F5F6F8
    }
  `;

  const Td = styled.td`
    padding-left: 8px;

      &:hover {
           transform: scale(1.1);
      }


  `;

  const Input = styled.input`
    width: 80%;

      &:focus-within {
          border: 1px dashed lightgrey;

      }
  `;

  const StyledDatetimePickerTrigger = styled(DatetimePickerTrigger)`
        padding-left: 8px;

        &:hover {
            cursor: pointer;
        }
  `;


  return (
    <Tr style={{borderBottom: "1px solid #F1F1F1"}}>
        <td style={{width: '1em', backgroundColor: props.color}} >
        <Button onClick={(event) => props.deleteTask(event, props.group, props.task)} color={props.color} ><DeleteOutlineOutlinedIcon/></Button>
        </td>
      <Td>
        <div style={{width: '30px', height: '100%', display: 'inline-block', backgroundColor: props.color}} > </div>
          <Input
              onChange={(event) => setTask(event.target.value)}
              onBlur={updateTaskName}
              id="filled-read-only-input"
              value={task.name}
              margin="normal"
          />
      </Td>
      <Td>
          <Input
              onChange={(event) => setOwner(event.target.value)}
              onBlur={updateOwner}
              id="filled-read-only-input"
              value={owner}
              margin="normal"
          />
      </Td>
      <Td>
          <SelectWrap
              name={'status'}
              options={statusOptions}
              value={taskStatus}
              placeholder={''}

              onChange={(event) => { setTaskStatus(event.target.value); updateStatus(event.target.value) }}
          />
      </Td>
      <td >
          <StyledDatetimePickerTrigger
            shortcuts={shortcuts}
            moment={date}

            onChange={(event) => { setDate(event); updateDate(event) }}>
            <Input type="text" value={date.format('MMM DD')} />
          </StyledDatetimePickerTrigger>
      </td>
      <Td>
          <SelectWrap
              name={'priority'}
              options={priorityOptions}
              value={taskPriority}
              placeholder={''}
              className={classes.selectWrap}
              onChange={(event) => { setTaskPriority(event.target.value); updatePriority(event.target.value) }}
          />
      </Td>
    </Tr>
  )
}
