import React, {Component} from 'react';
import Login from './Login'
import Register from './Register'


class LoginHome extends Component {
    constructor(porps) {
        super(porps);
        this.state = {
            id: 2
        }
    }

    changeType = (val)=>{
        this.setState({
            id:val
        })
    }

    render() {
        const {id} = this.state
        return (
            <div>
                {id === 1 ? <Login changeType={this.changeType}></Login> : <Register changeType={this.changeType}></Register>}
            </div>
        );
    }
}

export default LoginHome;