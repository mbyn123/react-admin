import React, {Component} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './view/login'
import Home from './view/home'

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route component={Login} path="/" exact></Route>
                        <Route component={Home} path="/Home" exact></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;