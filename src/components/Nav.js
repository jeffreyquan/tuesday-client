
import React from 'react'
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
        .delete("https://tuesday-server.herokuapp.com/logout", { withCredentials: true })
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
        justify-content: space-between;
        width: 66px;
        color:white;
        align-item: center;
        height: 100vh;
    `;

    const Wrapper = styled.div`
        display: grid;
    `;

    const Button1 = styled.button`
        border-radius: 25px;
        width: 50px;
        height: 50px;
        color: white;
        font-weight: 700;
        font-size: 20px;
        align-self: center;
        background-color: transparent;
        border: none;
        margin: 5px;


        &:hover {
            background-color:#10121E;
        }
    `;

    const Button2 = styled.button`
        border-radius: 25px;
        width: 50px;
        height: 50px;
        color: white;
        background-color: #F5617F;
        font-family: "Abel";
        font-weight: 700;
        font-size: 20px;
        border: 3px solid white;
        margin: 1em 5px ;

    `;



    return(
        <Bar>
        <div>
        <img style={{flexGrow: "1"}} src={Logo} alt="Logo" width="90%" />
        <Button1 ><NotificationsNoneIcon /></Button1>
        </div>
        <div>
        <Button1 ><OfflineBoltOutlinedIcon /></Button1>
        <Button1 ><PersonAddOutlinedIcon /></Button1>
        <Button1 ><SearchOutlinedIcon /></Button1>
        <Button1 ><HelpOutlineOutlinedIcon /></Button1>
        <Button2 onClick={() =>  handleLogoutClick()}>Exit</Button2>
        </div>
        </Bar>
    )
}

export default Nav
