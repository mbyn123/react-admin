import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import PrivateRouter from '@/router/privateRouter'
import Login from '@/view/login'
import Home from '@/view/home'

class App extends Component {
    render () {
        return (
            <div>
                <BrowserRouter>
                <ConfigProvider locale={zh_CN}>
                    <Switch>
                        <Route component={Login} path="/login"></Route>
                        <PrivateRouter component={Home} path="/" />
                    </Switch>
                    </ConfigProvider>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;