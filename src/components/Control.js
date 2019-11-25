import React, { Component } from 'react';
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
        console.log( memberships );
        this.setState({
          memberships: memberships
        });
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
        <Membership memberships={ this.state.memberships } />
      </div>
    )
  }
}

class Membership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membership: this.props.memberships
    }
  }

  render() {
    return (
      <div>
        <h1>Membership coming soon</h1>
      </div>
    )
  }

}

export default Control;
