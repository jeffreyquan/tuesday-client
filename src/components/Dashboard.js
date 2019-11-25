import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Nav from './Nav'
import Control from './Control'

const SERVER_URL = "http://localhost:3000/projects/1"

let URL = (model) => {
    return `http://localhost:3000/${model}.json`
}; // need to fix this for later - depends what project id a user has
// const SERVER_URL = "http://localhost:3000/groups"

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
  console.log(props);
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [projectId, setProjectId] = useState(1)

    const classes = useStyles();

    useEffect(() => {
        axios.get(`http://localhost:3000/projects/1`).then((results) => {
            console.log(results.data["groups"]);

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

    return (
        <div>
        <Nav {...props} handleLogout={props.handleLogout} />
        <Control {...props} user = {props.user} loggedInStatus={props.loggedInStatus}/>
            { !groups.length ? <h3>Loading</h3> : (
                <div>
                    <form onSubmit={saveGroupName}>
                        <input placeholder="Group Name" onChange={(event) => setGroupName(event.target.value)} />
                        <input type="submit" value="Add Group" />
                    </form>

                    { groups.map(group => {
                        console.log("group", group)
                        return (
                        <div>
                            <table>
                                <tr>
                                    <th><TextField
                                            id="filled-read-only-input"
                                            value={group.name}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        <button onClick={(event) => deleteGroup(event, group)}>x</button>
                                    </th>

                                        <th>Owner</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                        <th>Priority</th>

                                </tr>

                                { group.tasks && group.tasks.map((task, taskIndex) => (
                                    <tr>
                                        <td>
                                            <TextField
                                                id="filled-read-only-input"
                                                value={task.name}
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                // onChange={(event) => onChangeHandler(event, group, task, taskIndex, "name")}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                id="filled-read-only-input"
                                                value={task.owner}
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                // onChange={(event) => onChangeHandler(event, group, task, taskIndex, "name")}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                id="filled-read-only-input"
                                                value={task.status}
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                // onChange={(event) => onChangeHandler(event, group, task, taskIndex, "name")}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                id="filled-read-only-input"
                                                value={new Date(task.due_date)}
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                // onChange={(event) => onChangeHandler(event, group, task, taskIndex, "name")}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                id="filled-read-only-input"
                                                value={task.priority}
                                                className={classes.textField}
                                                margin="normal"
                                                variant="outlined"
                                                // onChange={(event) => onChangeHandler(event, group, task, taskIndex, "name")}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    )})}
                </div>
            )}
        </div>
    )
}

export default Dashboard;
