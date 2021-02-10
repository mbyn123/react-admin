import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRouter from '@/router/privateRouter'
import Login from '@/view/login'
import Home from '@/view/home'

class App extends Component {
    render () {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route component={Login} path="/login"></Route>
                        <PrivateRouter component={Home} path="/" />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;