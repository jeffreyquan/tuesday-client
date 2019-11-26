import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Collapsible from './partial/Collapsible.js'

import NotInterestedRoundedIcon from '@material-ui/icons/NotInterestedRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';

const ControlStyle = styled.div`
      background-color: white !important;
      border-right: 1px solid lightgrey;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      width: 255px;
      height: 100vh;
      padding: 1.2em;
`;


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
                const memberships = results.data.memberships
                // console.log( memberships );
                this.setState({
                    memberships: memberships
                });
                setTimeout( fetchMemberships, 10000);
                console.log(this.state.memberships );
            });
        }
        fetchMemberships();
    }

    saveProject(content) {
        axios.post(`http://localhost:3000/projects.json`, content).then((result) => {
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
                <ControlStyle>
                <Collapsible title="Pending invites">
                <Memberships memberships={ this.state.memberships } />
                </Collapsible>

                <h2>Projects</h2>
                <div>
                <Projects memberships={ this.state.memberships } />
                <NewProjectForm onSubmit={ this.saveProject } />
                </div>
                </ControlStyle>
            )
        }
    }

    function Memberships(props) {
        return (
            <div>
            {props.memberships.map(m => m.invitation === false ? <Invitation membership={ m }/> : null)}
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
            axios.put(`http://localhost:3000/memberships/${ this.state.membership_id }.json`, {invitation : true}).then(result => console.log('Successfully updated.'))
        }

        _declineInvite() {
            axios.delete(`http://localhost:3000/memberships/${ this.state.membership_id }.json`).then( result => console.log('Successfully deleted.'))
        }

        render() {
            return (
                <InvitationWrap>
                <Wrap>
                <AccountTreeOutlinedIcon /><span>{ this.props.membership.project.name }</span>
                </Wrap>
                <div>
                <Button onClick={ this._acceptInvite }><CheckCircleOutlineRoundedIcon /></Button>
                <Button onClick={ this._declineInvite }><NotInterestedRoundedIcon /></Button>
                </div>
                </InvitationWrap>
            )
        }
    }


    const InvitationWrap = styled.div`
        display: flex;
        justify-content: space-between;
        color: #333333;
        padding: 4px;
        margin: 2px auto;
        border-radius: 5px;
        align-item: center;

        &:hover {
            background-color: lightgrey;
        }
    `;

    const Wrap = styled.div`
        display: flex;
        align-item: center;
    `;


    const Button = styled.button`
        border: none;
        background-color: transparent;

        &:hover{
            color: #0086C0;
        }
    `;

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
            this.setState({
                name: '',
                description: ''
            })
        }


        render() {
            return (
                <div>
                <form onSubmit={ this._handleSubmit }>
                <label>Name:</label>
                <input
                type="text"
                name="name"
                required
                onInput={ this._handleInput }
                />
                <label>Description</label>
                <input
                type="text"
                name="description"
                onInput={ this._handleInput }
                />
                <input type="submit" name="Submit" />
                </form>
                </div>
            )
        }
    }



export default Control;
