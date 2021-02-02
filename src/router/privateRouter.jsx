import React, { Component } from 'react';
import { Route } from 'react-router-dom'

const PrivateRouter = ({ compontens: Component, ...rest }) => {
    console.log({ ...rest })
    return (
        <Route {...rest} render={routerProps => (
            true ? <Component {...routerProps} /> : '11111'
        )} />

    )
}

export default PrivateRouter;