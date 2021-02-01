import React, { Component } from 'react';
import {Button} from 'antd'

class CodeButton extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render () {
        return (
            <Button type="primary" block >获取获证码</Button>

        );
    }
}

export default CodeButton;