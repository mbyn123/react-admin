import React, { Component } from 'react';
import { Switch,Redirect } from "react-router-dom"
import PrivateRouter from '@/router/privateRouter'
import UserList from "@/view/user/list"
import UserAdd from "@/view/user/add"
import path from "@/utils/routerConfig"
class Main extends Component {
    render () {
        return (
            <Switch>
                <Redirect exact from="/" to={path}></Redirect>
                <PrivateRouter path="/user/list" component={UserList}></PrivateRouter>
                <PrivateRouter path="/user/add" component={UserAdd}></PrivateRouter>
            </Switch>
        );
    }
}

export default Main;