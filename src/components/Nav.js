
import React, {Component} from 'react'
import Logo from '../image/logo.svg'
import styled from 'styled-components';


import axios from 'axios'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';



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
        display: flex;
        flex-direction: column;
     `;


        return(
            <Bar>
            <img src={Logo} width="100%" />



            <Divider />
            <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            ))}
            </List>
            <Divider />
            <button onClick={() =>  handleLogoutClick()}>Logout</button>
            </Bar>
        )
}

export default Nav
