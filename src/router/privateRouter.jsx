import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { getUserInfo } from "@/utils/session"


const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={routerProps => (
            getUserInfo() && getUserInfo().token ? <Component {...routerProps} /> : <Redirect to="/login" />
        )} />

    )
}

export default PrivateRouter;