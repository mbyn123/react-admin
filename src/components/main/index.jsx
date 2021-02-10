import React, { Component } from 'react';
import { Switch,Redirect } from "react-router-dom"
import PrivateRouter from '@/router/privateRouter'
import path from "@/utils/routerConfig"



const routerComponents = []
let files = require.context("@/view/",true,/\.jsx$/)
files.keys().map(key => {
    if(key.includes("./home") || key.includes("./login")){return false}
    const path = key.split(".")[1]
    const component = files(key).default
    routerComponents.push({path,component})
    return routerComponents
})

class Main extends Component {
    render () {
        return (
            <Switch>
                <Redirect exact from="/" to={path}></Redirect>
                {
                    routerComponents.map(item=>{
                       return <PrivateRouter path={item.path} component={item.component} key={item.path}></PrivateRouter>
                    })
                }
              
            </Switch>
        );
    }
}

export default Main;