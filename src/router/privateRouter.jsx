import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { getUserInfo } from "@/utils/session"


const PrivateRouter = ({ component: Component, ...rest }) => {
    const {token} = getUserInfo()
    return (
        <Route {...rest} render={routerProps => (
            getUserInfo() && token ? <Component {...routerProps} /> : <Redirect to="/" />
        )} />

    )
}

export default PrivateRouter;