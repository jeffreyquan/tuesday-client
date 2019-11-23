import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/groups'

export default class Dashboard extends Component {
    
    state = {
        groups: []
    }

    componentDidMount() {
        console.log("component did run when loaded");
        axios.get(SERVER_URL).then((results) => {
            console.log(results.data);
            
            this.setState({groups: results.data});
            
        })
    }

    render() {
        if (!this.state.groups.length) return (<h3>Loading</h3>);

        return(
            <div>
                {this.state.groups.map(group => (
                    <div>
                        <h2>{group.name}</h2>
                        {group.tasks.map(task => (
                                <p>Task: {task.name} | Status: {task.status} | Due date: {task.dueDate} | Priority: {task.priority} | Owner: {task.owner}</p>
                        ))}
                    </div>
                ))}
            </div>
        )
    }



}
