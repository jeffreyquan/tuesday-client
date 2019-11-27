import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Nav from './Nav'
import Control from './Control'
import Team from './Team'
import GroupNameField from './GroupNameField'
import Task from './Task'
import Toolbar from './Toolbar'
import useWindowSize from './partial/WindowSize'

const SERVER_URL = "http://localhost:3000/projects/1" // need to fix this for later - depends what project id a user has

let URL = (model, id = '') => {
    return `http://localhost:3000/${model}/${id}`
};


let panelWrapWidth

function SaveTaskComponent(props) {
    const [taskName, setTaskName] = useState('');
    const saveTaskName = async () => {
        axios
            .post(`http://localhost:3000/groups/${props.groupId}/tasks`,
                { name: taskName, group_id: props.groupId })
            .then((results) => {
                axios
                    .get(`http://localhost:3000/projects/1/groups`)
                    .then(({ data }) => {
                        props.setGroups(data);
                    })
            })
    }

    return (
        <div>
            <input value={taskName} placeholder="+Add" onChange={(event) => setTaskName(event.target.value)} />
            <input type="button" value="Add Task" onClick={saveTaskName}/>
        </div>
    )
}

function Dashboard(props) {
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [projectId, setProjectId] = useState(1);
    const [task, setTask] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:3000/projects/1`)
            .then((results) => {
                setGroups(results.data.groups);
            })
    }, [])

    const saveGroupName = (event) => {
        event.preventDefault();

        const postRequest = {
            group: {
                "project_id": projectId,
                "name": groupName,
                "tasks": []
            }
        }

        axios.post(URL('groups'), postRequest).then((result) => {
            axios.get(SERVER_URL).then((results) => {
                setGroups(results.data["groups"]);
            })
        })
    }

    const deleteGroup = (event, group) => {
        axios.delete(URL('groups', group.id)).then((result) => {
            axios.get(SERVER_URL).then((results) => {
                setGroups(results.data["groups"]);
            })
        })
    }

    const deleteTask = (event, group, task) => {
        console.log(task, "task");

        axios.delete(`http://localhost:3000/groups/${group.id}/tasks/${task.id}`).then((result) => {
            axios.get(SERVER_URL).then((results) => {
                setGroups(results.data["groups"]);
            })
        })
    }


    const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 66px 255px auto;
    height: 100vh;
    overflow-x: hidden;
    `;

    const StyledControl = styled(Control)`
    background-color: white !important;
    border: 1px solid lightgrey;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    width: 255px;
    height: 100vh;
    `;

    panelWrapWidth = useWindowSize().width-321

    const PanelWrap = styled.div`
    height: 100vh;
    background-color: white;
    padding-left: 1em;
    `;

    const Panel = styled.div`
    padding: 1em;
    height: 80vh;
    overflow: scroll;
    `;

    return (
        <Wrapper>
        <Nav {...props} handleLogout={props.handleLogout} />
        <StyledControl {...props} />
        <PanelWrap style={{width: panelWrapWidth}}>
        <Toolbar />
        <Panel>
        { !groups.length ? <h3>Loading</h3> : (
            <div>
                <form onSubmit={saveGroupName}>
                    <input value={groupName} placeholder="Group Name" onChange={(event) => setGroupName(event.target.value)} />
                    <input type="submit" value="Add Group" />
                </form>

                { groups.map(group => {
                    // console.log("group", group)
                    return (
                        <table>
                            <tbody>
                            <tr>
                                <th>
                                    <button onClick={(event) => deleteGroup(event, group)}>Delete Group</button>
                                    <GroupNameField groupName={group.name} id={group.id} key={group.id}/>
                                </th>

                                    <th>Owner</th>
                                    <th>Status</th>
                                    <th>Due Date</th>
                                    <th>Priority</th>

                            </tr>
                            <tr>
                                <td>
                                    <SaveTaskComponent groupId={group.id} setGroups={setGroups} />
                                </td>
                            </tr>
                            { group.tasks && group.tasks.map((task) => (
                                <Task task={task} id={task.id} group={group} deleteTask={deleteTask} key={task.id}/>
                            ))}
                            </tbody>
                        </table>
                )})}
                </div>
            )}
            </Panel>
            </PanelWrap>
            </Wrapper>
        )
    }

    export default Dashboard;
