import React, { Component } from 'react';
import { Button ,message} from 'antd'
import { getRegisterCode } from '../../http/api/login'

class CodeButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            module:'',
            butLoading: false,
            text: '获取获证码'
        }
    }
    getDerivedStateFormProps(nextProps,prevState){
        console.log(777,nextProps,prevState)
    }
     getCode = async () => {
        // console.log('1111')
        const {username,module} = this.props
        console.log(username)
        return false
        if(!username){
            message.warning('请输入邮箱')
            return
        }
        this.setButText('发送中')
        let time = 10
        let query={username,module}
        const {data:res} = await getRegisterCode(query).catch(err=>err)
        if(res.resCode !==0){
            message.warning(res.message)
            return
        }

        message.success(res.message,3)
        this.setState({butLoading: true,})
        let timer = setInterval(() => { 
            time--
            this.setButText(`${time}s`)
            if (time === 0 || res.resCode === 0) {
                this.setState({
                    butLoading: false,
                    text: '重新获取'
                })
                clearInterval(timer)
            }
        }, 1000);

    }

    setButText = (text) => {
        this.setState({text})
    }
    render() {
        const { butLoading, text } = this.state
        return (
            <Button loading={butLoading} type="primary" block onClick={this.getCode}>{text}</Button>

        );
    }
}

export default CodeButton;