import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberships: null
    };

    this.saveProject = this.saveProject.bind(this);

    if (props.user) {
      this.state.user_id = props.user.id;
      this.state.email = props.user.email;
    }

    // console.log( props );
    const fetchMemberships = () => {
      axios.get(`http://localhost:3000/users/${ this.state.user_id }.json`).then( ( results ) => {
        console.log( results );
        // const memberships = results.data.memberships
        // console.log( memberships );
        this.setState({
          // memberships: memberships
        });
        setTimeout( fetchMemberships, 10000);
        console.log(this.state.memberships );
      });
    }
    fetchMemberships();
  }

  saveProject(content) {
    axios.post(`http://localhost:3000/projects.json`, { content: content }).then((result) => {
      const newMembership = {
        user_id: this.state.user_id,
        project_id: result.id,
        invitation: true,
        email: this.state.email
      }

      axios.post(`http://localhost:3000/memberships.json`, newMembership).then((result) => {
        this.setState({memberships: [...this.state.memberships, result.data]})
      })
    })
  }

  render() {
    if ( this.state.memberships === null ) {
      return (<>
          </>);
    }
    return (
      <div className="control" style={{display:"block", zIndex:"10"}}>
        <h1>CONTROLLER</h1>
        <Collapsible title="Memberships">
          <Memberships user_id={ this.state.user_id } memberships={ this.state.memberships } />
        </Collapsible>
        <h2>Projects</h2>
        <div>
          <Projects memberships={ this.state.memberships } />
          <NewProjectForm onSubmit={ this.saveProject } />
        </div>
      </div>
    )
  }
}

function Memberships(props) {
  return (
    <div>
      {props.memberships.map( (m) => {
        if ( m.invitation === false ) {
          return (
            <Invitation membership={ m }/>
          )
        }
      })}
    </div>
  );
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
      console.log('Successfully updated.')
    })
  }

  _declineInvite() {
    axios.delete(`http://localhost:3000/memberships/${ this.state.membership_id }.json`).then( (result) => {
      console.log('Successfully deleted.')
    })
  }

  render() {
    return (
      <div className="invitation">
        <p>{ this.props.membership.project.name }</p>
        <p>{ this.props.membership.project.description }</p>
        <button onClick={ this._acceptInvite }>Accept</button>
        <button onClick={ this._declineInvite }>Decline</button>
      </div>
    )
  }
}

function Projects(props) {
  return (
    <div>
      {props.memberships.map( (p) => {
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

class NewProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: ''
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
    this.setState({})
  }


  render() {
    return (
      <div>
        <form onSubmit={ this._handleSubmit }>
          <input type="text" name="name" required onInput={ this._handleInput }/>
          <input type="text" name="description" onInput={ this._handleInput }/>
          <input type="submit" name="Submit" />
        </form>
      </div>
    )
  }
}


class Collapsible extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          open: false
      }
      this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e){
      this.setState({open: !this.state.open})
  }

  componentDidUpdate() {
      // this.props.onToggle(this.props.index);
  }

  render() {
    return (<div>
      <div onClick={(e)=>this.togglePanel(e)} className='header'>
          {this.props.title}</div>
      {this.state.open ? (
          <div className='content'>
              {this.props.children}
          </div>
          ) : null}
    </div>);
  }
}

export default Control;
