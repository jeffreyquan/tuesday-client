import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberships: null
    };

    if (props.user) {
      this.state.user_id = props.user.id;
    }

    const fetchMemberships = () => {
      axios.get(`http://localhost:3000/users/${ this.state.user_id }.json`).then( ( results ) => {
        const memberships = results.data.memberships
        // console.log( memberships );
        this.setState({
          memberships: memberships
        });
        setTimeout( fetchMemberships, 500);
      });
    }
    fetchMemberships();
  }

  render() {
    if ( this.state.memberships === null ) {
      return '';
    }
    return (
      <div>
        <h1> Control coming soon </h1>
        <Projects memberships={ this.state.memberships } />
        <Memberships memberships={ this.state.memberships } />
      </div>
    )
  }
}

class Memberships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberships: this.props.memberships
    };
  }

  render() {
    return (
      <div>
        {this.state.memberships.map( (m) => {
          if ( m.invitation === false ) {
            return (
              <Invitation membership={ m } />
            )
          }
        })}
      </div>
    );
  }
}

class Invitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membership_id: this.props.membership.id,
    };

    this._acceptInvite = this._acceptInvite.bind(this);
    this._declineInvite = this._declineInvite.bind(this);
  }

  _acceptInvite() {
    const acceptedInvitation = {
      invitation: true,
    }

    axios.put(`http://localhost:3000/memberships/${ this.state.membership_id }.json`, acceptedInvitation).then(
      (result) => {
        console.log("Successful");
      }
    )
  }

  _declineInvite() {
    axios.delete(`http://localhost:3000/memberships/${ this.state.membership_id }.json`).then( (result) => {
      this.setState({
        membership_id: null
      })
    })
  }


  render() {
    return (
      <div>
        <p>{ this.props.membership.project.name }</p>
        <p>{ this.props.membership.project.description }</p>
        <button onClick={ this._acceptInvite }>Accept</button>
        <button onClick={ this._declineInvite }>Decline</button>
      </div>
    )
  }
}

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.memberships
    };
  }

  render() {
    return (
      <div>
        {this.state.projects.map( (p) => {
          if ( p.invitation === true ) {
            return (
              <div>
                <Link to={{
                  pathname: "/dashboard",
                  state:{ project: p.project }
                }}>{ p.project.name }</Link>
              </div>
            )
          }
        })}
      </div>
    )
  }
}

export default Control;
