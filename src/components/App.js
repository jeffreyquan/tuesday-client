import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home'
import Dashboard from './Dashboard'

import axios from 'axios'

let URL = (model, id = '') => {
    return `https://tuesday-server.herokuapp.com/${model}/${id}`
};

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


    useEffect(() => {
        axios
        .get(URL(`logged_in`), { withCredentials: true })
        .then(({ data }) => {
          console.log( data );
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
        <HashRouter>
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
        </HashRouter>

    )
}

export default App;
