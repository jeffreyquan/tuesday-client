import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home'
import Dashboard from './Dashboard'
import Group from './Group'

import axios from 'axios'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

function App(props) {
    const classes = useStyles();

    const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
    const [jwt, setJwt] = useState("");
    const [user, setUser] = useState(null);


    const handleLogin = (data) => {
        setLoggedInStatus("LOGGED_IN")
        setJwt(window.localStorage.getItem("jwt"))
        setUser(data.user)
    }


    const handleLogout = () => {
        setLoggedInStatus("NOT_LOGGED_IN")
        setJwt("")
        setUser(null)
    }

    const redirectTo = () => {
        return <Redirect to="/" />;
    }

    useEffect(() => {
        axios
        .get("http://localhost:3000/logged_in", { withCredentials: true })
        .then(({ data }) => {
            if (data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
                handleLogin(data)
            } else {
                handleLogout()
            }
        })
        .catch(error => {
            console.log("check login error", error);
        });
    }, [])

    return (
        <>
        <div className={classes.root}>
        <BrowserRouter>
        {!jwt ? <Redirect to ="/" /> : null}

        <main className={classes.content}>
        <Switch>
        <Route exact path={"/"}
        render={props => (
            <Home {...props} handleLogin={handleLogin} loggedInStatus={loggedInStatus} />
        )}
        />
        <Route exact path={"/dashboard"}

        render={props => (
            <Dashboard {...props} user={user}
            handleLogout={handleLogout} loggedInStatus={loggedInStatus} />
        )}
        />
        </Switch>
        </main>

        </BrowserRouter>

        </div>
        </>
    )
}

export default App;
