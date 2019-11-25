import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home'
import Dashboard from './Dashboard'
import Group from './Group'

import axios from 'axios'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';



axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

function App(props) {

    const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
    const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
    const [user, setUser] = useState(null);


    const handleLogin = (data) => {
        setLoggedInStatus("LOGGED_IN")
        setJwt(localStorage.getItem("jwt"))
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
        <BrowserRouter>
        {!jwt ? <Redirect to ="/" /> : null}

        <Switch>
        <Route exact path={"/"}
        render={props => (
            <Home {...props} handleLogin={handleLogin} loggedInStatus={loggedInStatus} />
        )}
        />

        <Route exact path={"/dashboard"}
        render={props => (
            <Dashboard {...props} user={user}
            handleLogout={handleLogout} loggedInStatus={loggedInStatus}/>
        )}
        />
        </Switch>
        </BrowserRouter>

    )
}

export default App;
