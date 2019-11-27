import React, { Component } from 'react';
import axios from 'axios';

class Team extends Component {
  constructor() {
    super();
    this.state = {
      emails: [],
      members: null,
      invitations: null,
    };

    this.saveInvitation = this.saveInvitation.bind(this);

    const fetchMemberships = () => {
      // link to connected to project link in Control panel or Board
      axios.get(`http://localhost:3000/projects/3.json`).then((results) => {
        console.log(results.data.memberships);
        let emails = [];
        let members = [];
        let invitations = [];
        results.data.memberships.map( (m) => {
          if (m.invitation === true) {
            members.push(m);
            emails.push(m.email);
          } else {
            invitations.push(m);
            emails.push(m.email);
          }
        })
        console.log( members );
        this.setState({
          emails: emails,
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
        <h1>Team</h1>
          <h2>Members</h2>
          <Display team={ this.state.members } />
          <h2>Pending Invitations</h2>
          <Display team={ this.state.invitations } />
          <InviteForm emails={ this.state.emails } onSubmit={ this.saveInvitation } />
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
  constructor(props) {
    super(props);
    this.state = {
      emails: this.props.emails,
      form: {
        email: '',
        admin: false,
        project_id: 3, // to be linked to project link in control panel
        invitation: false,
      },
      formErrors: {
        email: null,
      }
    }
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  _handleChange(event) {
    const { name, value } = event.target;
    const { form, formErrors } = this.state;
    let formObj = {};
    formObj = { ...form, [name]:value };
    this.setState({ form: formObj }, () => {
      let formErrorsObj = {};
      const errorMessage = this.validateEmail(value);
      formErrorsObj = {...formErrors, [name]: errorMessage };
      this.setState({ formErrors: formErrorsObj });
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    const { emails, form, formErrors } = this.state;
    const errorObj = this.validateForm(form, formErrors, this.validateEmail);
    if ( Object.keys(errorObj) != 0 ) {
      this.setState({ formErrors: { ...formErrors, ...errorObj } });
      console.log(errorObj);
      return false;
    } else {
      this.props.onSubmit(form);
      this.setState({
        emails: [...emails, form.email],
        form: {
          email: '',
          admin: false,
          project_id: 3,
          invitation: false,
        },
        formErrors: {
          email: null,
        }
      })
    }
  }

  validateForm = (form, formErrors, validateFunction) => {
    const errorObj = {};
    Object.keys(formErrors).map(x => {
      const msg = validateFunction(form[x]);
      if (msg) {
        errorObj[x] = msg;
      }
    });
    return errorObj;
  }

  validateEmail = (value) => {
    let errorMessage = null;
    let alreadyInvited = this.state.emails;
    if (!value) {
      errorMessage = "Please enter email.";
    } else if (alreadyInvited.includes(value)) {
      errorMessage = "Already invited."
    }
    return errorMessage;
  };

  render() {
    const { form, formErrors } = this.state;
    return (
      <div>
        <form onSubmit={ this._handleSubmit }>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            required
            onChange={ this._handleChange }
            value={ form.email }
          />
          <span className="errors">{ formErrors.email }</span>
          <input type="submit" name="Invite" value="Invite" />
        </form>
      </div>
    )
  }
}

export default Team;
