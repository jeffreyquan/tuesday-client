import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

import Nav from './Nav'
import Control from './Control'
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
  const [projectId, setProjectId] = useState('');
  const [task, setTask] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const classes = useStyles();
    // useEffect(() => {
    //     axios
    //     .get(`https://tuesday-server.herokuapp.com/projects/1`)
    //         .then((results) => {
    //             setGroups(results.data.groups);
    //         })
    //     }, []
    // )

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
    console.log(id);
    setProjectId(id);
    console.log(projectId);
    axios.get(URL(`projects`, id)).then(( results ) => {
      setGroups(results.data.groups);
      setProjectName(results.data.name);
      setProjectDescription(results.data.description);
    })
  }

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

    const colorList = [['rgb(225, 68, 92)', 'rgba(225, 68, 92, 0.3)'],['rgb(87, 155, 252)', 'rgba(87, 155, 252, 0.3)'],['rgb(255, 203, 1)', 'rgba(255, 203, 1, 0.3)'],['rgb(120, 74, 209)', 'rgba(120, 74, 209, 0.3)'], ['rgb(156, 211, 37)', 'rgba(156, 211, 37, 0.3)'], ['rgb(255, 21, 138)', 'rgba(255, 21, 138, 0.3)']];


    return (
        <ThemeProvider theme={theme}>
        <Wrapper>
        <Nav {...props} handleLogout={props.handleLogout} />
        <Control {...props} onClick={setProject} />
        <PanelWrap style={{width: panelWrapWidth}}>
        <Toolbar projectName={projectName} projectDescription={projectDescription} projectId={projectId}/>
        <Panel>
        { !groups.length ? <h3>Loading</h3> : (
            <div style={{width: '100%'}}>
            <SaveGroupComponent projectId={projectId} setGroups={setGroups} />
            { groups.map(group => {
                return (
                    <div style={{width: '100%'}}>
                    <table style={{borderTop: "1px solid lightgrey", width: '100%'}}>
                    <tbody>
                    <tr>
                    <th style={{width: '1em', backgroundColor:colorList[index][0]}}><button onClick={(event) => deleteGroup(event, group)} style={{backgroundColor: 'transparent'}}><RemoveShoppingCartOutlinedIcon /></button>
                    </th>
                    <th style={{width: '35em'}}>
                    <GroupNameField groupName={group.name} id={group.id} key={group.id}/>
                    </th>
                    <th style={{width: '8em'}}>Owner</th>
                    <th style={{width: '12em'}}>Status</th>
                    <th style={{width: '15em'}}>Due Date</th>
                    <th style={{width: '8em'}}>Priority</th>
                    </tr>

                    { group.tasks && group.tasks.map((task) => (
                        <Task task={task} id={task.id} group={group} deleteTask={deleteTask} key={task.id} color={colorList[index][1]}/>
                    ))
                }
                </tbody>
                </table>
                <SaveTaskComponent projectId={projectId} groupId={group.id} setGroups={setGroups} />
                </div>
            )})
        }
        </div>
    )}
    </Panel>
    </PanelWrap>
    </Wrapper>
    </ThemeProvider>
)}

function SaveGroupComponent(props) {
  const [groupName, setGroupName] = useState('');
  const postRequest = {
    "project_id": props.projectId,
    "name": groupName,
    "tasks": []
  };

  console.log(postRequest);

  const saveGroupName = async (event) => {
    event.preventDefault();
    axios.post(URL(`groups`), postRequest).then((result) => {
      axios.get(URL(`projects`, props.projectId)).then((results) => {
          props.setGroups(results.data["groups"]);
      })
    })
  }

  return (
    <div style={{minWidth: '100%'}}>
      <form onSubmit={saveGroupName}>
      <input value={groupName} placeholder="Group Name" onChange={(event) => setGroupName(event.target.value)} />
      <input type="submit" value="Add Group" />
      </form>
    </div>
  )
}

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
    <div style={{minWidth: '100%'}}>
    <input style={{minWidth: '90%'}} value={taskName} placeholder="+Add" onChange={(event) => setTaskName(event.target.value)} style={{display: 'inline-block'}}/>
    <input type="button" value="Add Task" onClick={saveTaskName} style={{display: 'inline-block'}}/>
    </div>
  )
}

export default Dashboard;
