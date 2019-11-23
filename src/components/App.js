import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home'
import Dashboard from './Dashboard'
import axios from 'axios'

function App(props) {

    const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN')
    const [user, setUser] = useState(null)

    const handleLogin = (data) => {
        setLoggedInStatus("LOGGED_IN")
        setUser(data.user)
    }

    const handleLogout = () => {
        setLoggedInStatus("NOT_LOGGED_IN")
        setUser(null)
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
        <div className='app'>
            <BrowserRouter>
                <Switch>
                    <Route
                    exact
                    path={"/"}
                    render={props => (
                        <Home
                            {...props}
                            handleLogin={handleLogin}
                            handleLogout={handleLogout}
                            loggedInStatus={loggedInStatus}
                        />
                    )}
                    />
                    <Route
                        exact
                        path={"/dashboard"}
                        render={props => (
                            <Dashboard
                                {...props}
                                user={user}
                                loggedInStatus={loggedInStatus}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;