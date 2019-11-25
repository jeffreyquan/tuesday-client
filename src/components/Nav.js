
import React, {Component} from 'react'
import Logo from '../image/logo.svg'
import styled from 'styled-components';
import axios from 'axios'

import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

function Nav (props) {


    const handleLogoutClick = () => {
        axios
        .delete("http://localhost:3000/logout", { withCredentials: true })
        .then(response => {
            props.handleLogout();
            localStorage.clear();
        })
        .catch(error => {
            console.log("logout error", error);
        })
    }

    const Bar = styled.div`
    background-color: #292F4C;
    display: flex;
    flex-direction: column;
    width: 66px;
    justify-content: flex-start;
    fontSize: 30px;
    color:white;
    `;

    const Wrapper = styled.div`
    display: grid;
    grid-column: 1;
    width: 100%;
    justify-content: center;
    item-align: center;
    item-self: flex-end
    `;

    return(
        <Bar>
        <img src={Logo} width="90%" />
        <NotificationsNoneIcon />
        <Wrapper>
        <OfflineBoltOutlinedIcon />
        <PersonAddOutlinedIcon />
        <SearchOutlinedIcon />
        <HelpOutlineOutlinedIcon />
        <button onClick={() =>  handleLogoutClick()}>Logout</button>
        </Wrapper>
        </Bar>
    )
}

export default Nav
