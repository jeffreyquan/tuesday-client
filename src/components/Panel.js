import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import Control from './Control'
import Nav from './Nav'
import Team from './Team'
import GroupNameField from './GroupNameField'
import Task from './Task'
import Toolbar from './Toolbar'
import Collapsible from './partial/Collapsible.js'
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import {Drawer, Button as ButtonUI, TextField, Input as InputUI, InputBase, ThemeProvider } from '@material-ui/core';
import { fade, withStyles, createMuiTheme } from '@material-ui/core/styles'
import { pink, green, blue, red, yellow, HUE } from '@material-ui/core/colors';


function Panel(props){
const state = props.state;

let { id } = useParams();

const Panel = styled.div`
padding: 1em;
height: 80vh;
overflow: scroll;
`;


    const Button = styled.button`
      color: transparent;
      background-color: transparent;

      &:hover {
          color: black;
      }
    `;


    const colorList = [['rgb(225, 68, 92)', 'rgba(225, 68, 92, 0.3)'],['rgb(87, 155, 252)', 'rgba(87, 155, 252, 0.3)'],['rgb(255, 203, 1)', 'rgba(255, 203, 1, 0.3)'],['rgb(120, 74, 209)', 'rgba(120, 74, 209, 0.3)'], ['rgb(156, 211, 37)', 'rgba(156, 211, 37, 0.3)'], ['rgb(255, 21, 138)', 'rgba(255, 21, 138, 0.3)']];

    const Tr = styled.tr`
        background-color: #F5F6F8;
    `;

    const Th = styled.th`
        padding-left: 16px;
    `;

return(
    <>
<Toolbar projectName={state.projectName} projectDescription={state.projectDescription} projectId={state.projectId}/>
<Panel>
{ !state.groups.length ? <h3>Please select a project.</h3> : (
    <div style={{width: '100%'}}>
    <SaveGroupComponent projectId={state.projectId} setGroups={state.setGroups} />
    { state.groups.map((group, index) => {
        return (
            <Collapsible title={<GroupNameField
                color={colorList[index][0]}
                groupName={group.name} id={group.id} key={group.id}/>} open={true} color={colorList[index][1]}>

            <table style={{width: '100%', marginTop: "0.2em"}}>
            <tbody>
            <Tr>
            <th style={{width: '1em', backgroundColor:colorList[index][0]}}><Button onClick={(event) => state.deleteGroup(event, group)} style={{backgroundColor: 'transparent'}}><RemoveShoppingCartOutlinedIcon /></Button>
            </th>
            <Th style={{width: '35em', backgroundColor: 'white'}}>

            </Th>
            <Th style={{width: '8em', borderTopLeftRadius: '15px'}}>Owner</Th>
            <Th style={{width: '12em'}}>Status</Th>
            <Th style={{width: '15em'}}>Due Date</Th>
            <Th style={{width: '8em', borderTopRightRadius: '15px'}}>Priority</Th>
            </Tr>

            { group.tasks && group.tasks.map((task) => (
                <Task task={task} id={task.id} group={group} deleteTask={state.deleteTask} key={task.id} color={colorList[index][1]}/>
            ))
        }
        </tbody>
        </table>

        <SaveTaskComponent projectId={state.projectId} groupId={group.id} setGroups={state.setGroups} bgcolor={colorList[index][1]} btncolor={colorList[index][0]}
        />
        </Collapsible>
    )})
}
</div>
)}
</Panel>
</>
)
}

function SaveTaskComponent(props) {
  const [taskName, setTaskName] = useState('');
  const saveTaskName = async () => {
    axios
    .post(`http://localhost:3000/groups/${ props.groupId }/tasks`,
      { name: taskName, group_id: props.groupId, due_date: moment() })
    .then((results) => {
      axios
      .get(`http://localhost:3000/projects/${ props.projectId }/groups`)
        .then(({ data }) => {
          props.setGroups(data);
        })
    })
}


    const Input = styled.input`
        height: 40px;
        display: 'inline-block';

        &:hover {
            background-color: ${props => props.bgcolor || "lightgrey"};
        }
    `;

    const Button = styled.button`
        height: '40px';
        display: 'inline-block';
        color: black;
        font-family: 'Abel';
        border-radius: 3px;
        background-color: ${props => props.btncolor || "lightgrey"};

        &:hover {
            cursor: pointer;
            background-color: ${props => props.bgcolor || "lightgrey"}
        }
    `;

    return (
        <div style={{display:'flex', itemAlign: 'center', marginBottom: '4em'}}>
        <Input value={taskName} placeholder="+Add" onChange={(event) => setTaskName(event.target.value)} style={{width: '90%'}}
        bgcolor={props.bgcolor}/>
        <Button onClick={saveTaskName} btncolor={props.btncolor} bgcolor={props.bgcolor}
        style={{width: '10%'}}>Add Task</Button>
        </div>
    )
}

function SaveGroupComponent(props) {
  const [groupName, setGroupName] = useState('');
  const postRequest = {
    "project_id": props.projectId,
    "name": groupName,
    "tasks": []
  };

  const saveGroupName = async (event) => {
    event.preventDefault();
    axios.post(URL(`groups`), postRequest).then((result) => {
      axios.get(URL(`projects`, props.projectId)).then((results) => {
          props.setGroups(results.data["groups"]);
      })
    })
  }

      const StyledInput = withStyles(theme => ({
        root: {
          'label + &': {
            marginTop: theme.spacing(3),
          },
        },
        input: {
          borderRadius: 25,
          position: 'relative',
          backgroundColor: theme.palette.common.white,
          border: '1px solid #ced4da',
          fontSize: 16,
          width: 'auto',
          padding: '10px 12px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),

          '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
          },
        },
      }))(InputBase);

      const StyledButtonUI = withStyles({
          root: {
              background: 'linear-gradient(90deg, #3EB2F9 10%, #009AFF 90%)',
              borderRadius: 25,
              height: 40,
              border: 0,
              color: 'white',
              padding: '5px 1em',
              boxShadow: '0 0 1px rgba(255, 105, 135, .3)',
              margin: '0 0.5em'
          },
          label: {
              textTransform: 'capitalize',
              fontWeight: 800
          },
      })(ButtonUI);

  return (
      <form onSubmit={saveGroupName} style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '2em'}}>
      <StyledInput value={groupName} placeholder="Group Name" onChange={(event) => setGroupName(event.target.value)}/>
      <StyledButtonUI type='submit' color="primary">Add</StyledButtonUI>
      </form>
  )
}

export default Panel
