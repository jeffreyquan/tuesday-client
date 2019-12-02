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


import useWindowSize from './partial/WindowSize'

let URL = (model, id = '') => {
    return `https://tuesday-server.herokuapp.com/${model}/${id}`
};

let panelWrapWidth
let dashboardHeight

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

function Dashboard(props) {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [projectId, setProjectId] = useState(localStorage.getItem('projectId'));

  const [task, setTask] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: yellow,
    },
    status: {
      danger: red,
    },
  });

  const setProject = (id) => {
    localStorage.setItem('projectId', id)
    setProjectId(id);
    axios.get(URL(`projects`, id)).then(( results ) => {
      setGroups(results.data.groups);
      setProjectName(results.data.name);
      setProjectDescription(results.data.description);
    })
  }

  const setUp = () => {
      const id = localStorage.getItem('projectId')
      if (id)
      axios.get(URL(`projects`, id)).then(( results ) => {
        setGroups(results.data.groups);
        setProjectName(results.data.name);
        setProjectDescription(results.data.description);
      })
  }
  // setUp();

    const deleteGroup = (event, group) => {
        axios.delete(URL('groups', group.id)).then((result) => {
            axios.get(URL(`projects`, projectId)).then((results) => {
                setGroups(results.data["groups"]);
            })
        })
    }

    const deleteTask = (event, group, task) => {
        console.log(task, "task");

        axios.delete(`https://tuesday-server.herokuapp.com/groups/${group.id}/tasks/${task.id}`).then((result) => {
            axios.get(URL(`projects`, projectId)).then((results) => {
                setGroups(results.data["groups"]);
            })
        })
    }

    const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 66px 255px auto;
    height: dashboardHeight;
    overflow: hidden;
    `;

    panelWrapWidth = useWindowSize().width-321
    dashboardHeight = useWindowSize().height

    const PanelWrap = styled.div`
    height: 100vh;
    background-color: white;
    padding-left: 1em;
    border-left: 1px solid #F1F1F1;
    `;

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

    return (
        <ThemeProvider theme={theme}>
        <Wrapper>
        <Nav {...props} handleLogout={props.handleLogout} />
        <Control {...props} onClick={setProject} />
        <PanelWrap style={{width: panelWrapWidth}}>
        <Toolbar projectName={projectName} projectDescription={projectDescription} projectId={projectId}/>
        <Panel>
        { !groups.length ? <h3>Please select a project.</h3> : (
            <div style={{width: '100%'}}>
            <SaveGroupComponent projectId={projectId} setGroups={setGroups} />
            { groups.map((group, index) => {
                return (
                  <>
                  <GroupNameField
                      color={colorList[index][0]}
                      groupName={group.name} id={group.id} key={group.id}/>
                    <Collapsible open={true}>

                    <table style={{width: '100%', marginTop: "0.2em"}}>
                    <tbody>
                    <Tr>
                    <th style={{width: '1em', backgroundColor:colorList[index][0]}}><Button onClick={(event) => deleteGroup(event, group)} style={{backgroundColor: 'transparent'}}><RemoveShoppingCartOutlinedIcon /></Button>
                    </th>
                    <Th style={{width: '35em', backgroundColor: 'white'}}>

                    </Th>
                    <Th style={{width: '8em', borderTopLeftRadius: '15px'}}>Owner</Th>
                    <Th style={{width: '12em'}}>Status</Th>
                    <Th style={{width: '15em'}}>Due Date</Th>
                    <Th style={{width: '8em', borderTopRightRadius: '15px'}}>Priority</Th>
                    </Tr>

                    { group.tasks && group.tasks.map((task) => (
                        <Task task={task} id={task.id} group={group} deleteTask={deleteTask} key={task.id} color={colorList[index][1]}/>
                    ))
                }
                </tbody>
                </table>

                <SaveTaskComponent projectId={projectId} groupId={group.id} setGroups={setGroups} bgcolor={colorList[index][1]} btncolor={colorList[index][0]}
                />
                </Collapsible>
                </>
            )})
        }
        </div>
    )}
    </Panel>
    </PanelWrap>
    </Wrapper>
    </ThemeProvider>
)}

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


function SaveGroupComponent(props) {
  const [groupName, setGroupName] = useState('');
  const postRequest = {
    "project_id": props.projectId,
    "name": groupName,
    "tasks": []
  };
  console.log(groupName);

  const saveGroupName = async (event) => {
    event.preventDefault();
    axios.post(URL(`groups`), postRequest).then((result) => {
      axios.get(URL(`projects`, props.projectId)).then((results) => {
          props.setGroups(results.data["groups"]);
      })
    })
  }


  return (
      <form onSubmit={saveGroupName} style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '2em'}}>
      <StyledInput value={groupName} placeholder="Group Name" onChange={(event) => {setGroupName(event.target.value); }} autofocus/>
      <StyledButtonUI type='submit' color="primary">Add</StyledButtonUI>
      </form>
  )
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

function SaveTaskComponent(props) {
  const [taskName, setTaskName] = useState('');
  const saveTaskName = async () => {
    axios
    .post(`https://tuesday-server.herokuapp.com/groups/${ props.groupId }/tasks`,
      { name: taskName, group_id: props.groupId })
    .then((results) => {
      axios
      .get(`https://tuesday-server.herokuapp.com/projects/${ props.projectId }/groups`)
        .then(({ data }) => {
          props.setGroups(data);
        })
    })
}


    return (
        <div style={{display:'flex', itemAlign: 'center', marginBottom: '4em'}}>
        <Input value={taskName} placeholder="+Add" onChange={(event) => setTaskName(event.target.value)} style={{width: '90%'}}
        bgcolor={props.bgcolor}/>
        <Button onClick={saveTaskName} btncolor={props.btncolor} bgcolor={props.bgcolor}
        style={{width: '10%'}}>Add Task</Button>
        </div>
    )
}

export default Dashboard;
