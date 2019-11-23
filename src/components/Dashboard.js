import React, { Component } from 'react';
import axios from 'axios';

// const SERVER_URL = 'https://tuesday-server.herokuapp.com/tasks'
const SERVER_URL = "http://localhost:3000/groups"

export default class Dashboard extends Component {
    
    state = {
        groups: [],
        groupName: ''
    }

    componentDidMount() {
        axios.get(SERVER_URL).then((results) => {
            this.setState({groups: results.data});
        })
    }

    saveGroupName = (event) => {
        event.preventDefault();
        console.log("groupName", this.state.groupName)

        const postRequest = {
            "name": this.state.groupName,
            "tasks": []
          }

        axios.post(SERVER_URL, postRequest).then((result) => {
           
            axios.get(SERVER_URL).then((results) => {
                this.setState({ groups: results.data });
            })

        })
    }

    // When you type or edit a task it will get updated/saved
    onChangeHandler = (event, { id }, task, taskIndex, field) => {
        event.persist() // Need this, read https://reactjs.org/docs/events.html#event-pooling 
        
        this.setState((prevState) => {
            const selectedGroupIndex = prevState.groups.findIndex((group) => group.id === id)

            const updatedGroups = prevState.groups
            updatedGroups[selectedGroupIndex].tasks[taskIndex][field] = event.target.value

            return ({ groups: updatedGroups })

        }, () => {
            // This second anonymous function is a callback function which is called after a
            // successful setState call

            // NOTE TODO
            // This should actually be done when onBlur
            // And not onChange, only need to call it when the user leaves the field to do something else
            // And not on every keystroke

            const updatedGroup = this.state.groups.find((group) => group.id === id)

            axios.put(`${SERVER_URL}/${id}`, updatedGroup).then((result) => {
           
                axios.get(SERVER_URL).then((results) => {
                    this.setState({ groups: results.data });
                })
            })
        })
    }

    deleteGroup = (event, group) => {
        axios.delete(`${SERVER_URL}/${group.id}`).then((result) => {
           
            axios.get(SERVER_URL).then((results) => {
                this.setState({ groups: results.data });
            })
        })
    }

    render() {
        if (!this.state.groups.length) return (<h3>Loading</h3>);

        return(
            <div>
                <form onSubmit={this.saveGroupName}>
                    <input placeholder="Group Name" onChange={(event) => this.setState({ groupName: event.target.value })} />
                    <input type="submit" value="Add Group" />
                </form>

                {this.state.groups.map(group => (
                    <div>
                        <table>
                            <button onClick={(event) => this.deleteGroup(event, group)}>x</button>
                            <tr>
                                <th>{group.name}</th>
                                <th>Owner</th>
                                <th>Status</th>
                                <th>Due Date</th>
                                <th>Priority</th>
                            </tr>
                            
                            {group.tasks.map((task, taskIndex) => (
                                <tr onClick={this.onClickHandler}>
                                    <td>
                                        <input type="text" value={task.name} onChange={(event) => this.onChangeHandler(event, group, task, taskIndex, "name")} />
                                    </td>
                                    <td>
                                        <input type="text" value={task.owner} />
                                    </td>
                                    <td>
                                        <input type="text" value={task.status} />
                                    </td>
                                    <td>
                                        <input type="text" value={task.dueDate} />
                                    </td>
                                    <td>
                                        <input type="text" value={task.priority} />
                                    </td>
                                </tr>
                            ))}
                            
                        </table>
                    </div>
                ))}
            </div>
        )
    }
}
