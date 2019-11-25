
import React, {Component} from 'react'
import Logo from '../image/logo.svg'


import axios from 'axios'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    menuButton: {
      marginRight: 36,
    },
    drawer: {
      maxWidth: 100,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },


    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));


function Nav (props) {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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

        return(
            <>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer)}
                classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
                }}
                open={open}
            >
                <img src={Logo} width="100%" />


                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
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
            </Drawer>
            </>
        )
}

export default Nav
