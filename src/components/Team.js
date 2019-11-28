import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TemporaryDrawer from './partial/Drawer'

import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import {Button as ButtonUI, TextField, Input as InputUI, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      members: null,
      invitations: null,
    };

    this.saveInvitation = this.saveInvitation.bind(this);

    const fetchMemberships = () => {
      axios.get(`http://localhost:3000/projects/${ props.projectId }.json`).then((results) => {
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

      <StyledTeam className="members">
        <h2 style={{margin: '0.3em 0 1em 0'}}>Team Members</h2>
        <div style={{overflow: 'scroll'}}>
        <InviteForm emails={ this.state.emails } onSubmit={ this.saveInvitation } projectId={ this.props.projectId } style={{margin: '0 0 1em 1em'}}/>
          <Display style={{height: '40vh', overflow: 'scroll'}} team={ this.state.members } />
          <h4>Pending</h4>
          <Display style={{height: '40vh', overflow: 'scroll'}} team={ this.state.invitations } />
          </div>
      </StyledTeam>
    )
  }
}


const IconContainer = styled.button`
border-radius: 25px;
width: 40px;
height: 40px;
font-weight: 700;
font-size: 20px;
background-color: transparent;
border: none;
margin-left: 1em;
vertical-align: center;
item-align: center;
text-alignment: center;

&:hover {
    background-color:#EDEEF0;
}
`;


const StyledTeam = styled.div`
    padding: 1em;
    height:100vh;
    width: 30%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: white;
    border: 1px solid lightgrey;
    z-index: 200;
`;

function Display(props) {
  return (
    <List>
      {props.team.map( (m) => {
        return(
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <FaceOutlinedIcon />
                  <SmsOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={m.user.name} secondary={m.email} />
            </ListItem>
        )
      })}
    </List>
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
        project_id: props.projectId,
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
          project_id: this.props.projectId,
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
    }  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errorMessage = "Please enter valid email.";
    } else if (alreadyInvited.includes(value)) {
      errorMessage = "Already invited."
    }
    return errorMessage;
  };

  render() {
    const { form, formErrors } = this.state;
    return (

        <form onSubmit={ this._handleSubmit } style={{display:'flex', itemAlign:'center', padding:'5px 0'}}>
          <StyledTextField
          id="outlined-basic" label="Find user by email" variant="outlined"
            type="text"
            name="email"
            required
            onChange={ this._handleChange }
            value={ form.email }
          />
          <StyledButtonUI type="submit" name="Invite" color="primary">Invite</StyledButtonUI>
          <div className="errors">{ formErrors.email }</div>
        </form>
    )
  }
}


const StyledButtonUI = withStyles({
    root: {
        background: 'linear-gradient(90deg, #3EB2F9 10%, #009AFF 90%)',
        borderRadius: 25,
        height:50,
        border: 0,
        color: 'white',
        padding: '5px 2em',
        boxShadow: '0 0 1px rgba(255, 105, 135, .3)',
        margin: '4px 1em',
    },
    label: {
        textTransform: 'capitalize',
        fontWeight: 800
    },
})(ButtonUI);

const StyledTextField = withStyles({
    root: {

        '& input:valid + fieldset': {
            borderColor: 'lightgrey',
            borderWidth: 1,
            borderRadius: 25,
        },
        '& input:valid:focus + fieldset': {
            borderColor: 'lightgrey',
            borderLeftWidth: 6,
            borderRadius: 25,
        },
    },
    label: {
        fontWeight: 800,
        color: 'lightgrey',
    },
})(TextField);


export default Team;
