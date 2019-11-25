import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Nav from './Nav'


const SERVER_URL = 'http://localhost:3000/projects/1/groups' // need to fix this for later - depends what project id a user has
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

    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');

    const classes = useStyles();

    useEffect(() => {
        axios.get(SERVER_URL).then((results) => {
            console.log(results.data);

            setGroups(results.data);
        })
    }, [])

    const saveGroupName = (event) => {
        event.preventDefault();

        const postRequest = {
            "name": groupName,
            "tasks": []
          }

        axios.post(SERVER_URL, postRequest).then((result) => {

            axios.get({SERVER_URL}).then((results) => {
                setGroups(results.data);
            })

        })
    }

    // When you type or edit a task it will get updated/saved
    const onChangeHandler = (event, { id }, task, taskIndex, field) => {
        event.persist() // Need this, read https://reactjs.org/docs/events.html#event-pooling

        // NOTE TODO
        // This should actually be done when onBlur
        // And not onChange, only need to call it when the user leaves the field to do something else
        // And not on every keystroke

        const selectedGroupIndex = groups.findIndex((group) => group.id === id)

        const updatedGroups = groups[selectedGroupIndex].tasks[taskIndex][field] = event.target.value

        setGroups(updatedGroups)

        const updatedGroup = groups.find((group) => group.id === id)

        axios.put(`${SERVER_URL}/${id}`, updatedGroup).then((result) => {

            axios.get(SERVER_URL).then((results) => {
                setGroups(results.data);
            })
        })
    }

    const deleteGroup = (event, group) => {
        axios.delete(`${SERVER_URL}/${group.id}`).then((result) => {
            axios.get(SERVER_URL).then((results) => {
                setGroups(results.data);
            })
        })
    }

    return (
        <div>
        <Nav {...props} handleLogout={props.handleLogout} />

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
                                <button onClick={(event) => deleteGroup(event, group)}>x</button>
                                <tr>
                                    <th>Group name: {group.name}</th>
                                    {/*
                                        <th>Owner</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                        <th>Priority</th>
                                    */}
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
