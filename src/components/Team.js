import React, { Component } from 'react';
import axios from 'axios';

class Team extends Component {
  constructor() {
    super();
    this.state = {
      all_memberships: null,
      members: null,
      invitations: null,
    };

    this.saveInvitation = this.saveInvitation.bind(this);

    const fetchMemberships = () => {
      axios.get(`http://localhost:3000/projects/3.json`).then((results) => {
        console.log(results.data.memberships)
        let members = [];
        let invitations = [];
        results.data.memberships.map( (m) => {
          m.invitation === true ? members.push(m) : invitations.push(m);
        })
        console.log( members );
        this.setState({
          all_memberships: members.concat(invitations),
          members: members,
          invitations: invitations
        })
        setTimeout( fetchMemberships, 10000);
      });
    }
    fetchMemberships();
  }

  saveInvitation(content) {
    axios.post(`http://localhost:3000/memberships.json`, content).then((result) => {
      this.setState({invitations: [...this.state.invitations, result.data ]})
    })
  }

  render() {
    if ( this.state.members === null ) {
      return ''
    }
    return (
      <div className="members">
        <h1>Team coming soon</h1>
          <h2>Members</h2>
          <Display team={ this.state.members } />
          <h2>Pending Invitations</h2>
          <Display team={ this.state.invitations } />
          <InviteForm all_memberships={this.state.all_memberships} onSubmit={ this.saveInvitation } />
      </div>
    )
  }
}

function Display(props) {
  return (
    <div>
      {props.team.map( (m) => {
        return(
          <div>
            <p>{ m.user.name} ({ m.email })</p>
          </div>
        )
      })}
    </div>
  )
}

class InviteForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      admin: false,
      project_id: 3,
      invitation: false,
    }
    this._handleInput = this._handleInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleInput(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      email: '',
      admin: false,
      project_id: 3,
      invitation: false,
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={ this._handleSubmit }>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            required
            onInput={ this._handleInput }
          />
          <input type="submit" name="Submit" />
        </form>
      </div>
    )
  }
}

export default Team;
