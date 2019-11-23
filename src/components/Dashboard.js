import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/groups'

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
                            <tr>
                                <th>{group.name}</th>
                                <th>Owner</th>
                                <th>Status</th>
                                <th>Due Date</th>
                                <th>Priority</th>
                            </tr>
                            
                            {group.tasks.map(task => (
                                <tr>
                                    <td>
                                        <input type="text" value={task.name} />
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
