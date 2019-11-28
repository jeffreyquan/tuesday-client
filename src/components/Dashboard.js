import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Nav from './Nav'
import Control from './Control'
import Team from './Team'
import GroupNameField from './GroupNameField'
import Task from './Task'
import Toolbar from './Toolbar'
import Collapsible from './partial/Collapsible.js'
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';

import useWindowSize from './partial/WindowSize'

let URL = (model, id = '') => {
    return `https://tuesday-server.herokuapp.com/${model}/${id}`
};

let panelWrapWidth
let dashboardHeight

function Dashboard(props) {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [task, setTask] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

    // useEffect(() => {
    //     axios
    //     .get(`https://tuesday-server.herokuapp.com/projects/1`)
    //         .then((results) => {
    //             setGroups(results.data.groups);
    //         })
    //     }, []
    // )


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

    return (
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
                    <tr style={{backgroundColor: "white"}}>
                    <th style={{width: '1em'}}><button onClick={(event) => deleteGroup(event, group)}><RemoveShoppingCartOutlinedIcon /></button>
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
                        <Task task={task} id={task.id} group={group} deleteTask={deleteTask} key={task.id}/>
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
