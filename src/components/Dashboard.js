import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import Nav from './Nav'
import Control from './Control'
import GroupNameField from './GroupNameField'
import Task from './Task'

const SERVER_URL = "http://localhost:3000/projects/1" // need to fix this for later - depends what project id a user has

let URL = (model, id = '') => {
    return `http://localhost:3000/${model}/${id}`
};

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
  // console.log(props);
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [projectId, setProjectId] = useState(1)

    const classes = useStyles();

    useEffect(() => {
        axios.get(`http://localhost:3000/projects/1`).then((results) => {
            // console.log(results.data["groups"]);

            setGroups(results.data["groups"]);
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
        axios.delete(`http://localhost:3000/groups/${group.id}`).then((result) => {
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
            grid-template-columns: 10% 10% 80%;
      `;
    return (
        <Wrapper>
        <Nav {...props} handleLogout={props.handleLogout} />
        <Control {...props} user = {props.user} loggedInStatus={props.loggedInStatus}/>
        <div>
            { !groups.length ? <h3>Loading</h3> : (
                <div>
                    <form onSubmit={saveGroupName}>
                        <input placeholder="Group Name" onChange={(event) => setGroupName(event.target.value)} />
                        <input type="submit" value="Add Group" />
                    </form>

                    { groups.map(group => {
                        // console.log("group", group)
                        return (
                        <div>
                            <table>
                                <tr>
                                    <th><GroupNameField groupName={group.name} id={group.id} />
                                        <button onClick={(event) => deleteGroup(event, group)}>x</button>
                                    </th>

                                        <th>Owner</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                        <th>Priority</th>

                                </tr>

                                { group.tasks && group.tasks.map((task) => (
                                    <Task task={task} group={group} deleteTask={deleteTask}/>
                                ))}
                            </table>
                        </div>
                    )})}
                </div>
            )}
        </div>
            </Wrapper>
    )
}

export default Dashboard;
