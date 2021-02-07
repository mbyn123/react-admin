import React, { Component } from 'react';
import './index.less'
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '@/http/api/login'
import { withRouter } from 'react-router-dom'
import CodeButton from '@/components/codeButton'
import { setUserInfo } from "@/utils/session"
import path from "@/utils/routerConfig"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }
    async onFinish (val) {
        console.log(val)
        const { data: res } = await login(val).catch(err => err)
        if (res.resCode !== 0) {
            message.error(res.message)
            return
        }
        setUserInfo(JSON.stringify(res.data))
        message.success(res.message)
        this.props.history.push(path)
    }



    changeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    render () {
        const { changeType } = this.props
        const { username } = this.state
        return (
            <div className='login-wrapper'>
                <div className="login-box">
                    <div className="login-box-header">
                        <div className="text left">登录</div>
                        <div className="text right" onClick={() => changeType(2)}>账号注册</div>
                    </div>
                    <div className="login-form-wrapper">
                        <Form
                            className="login-form"
                            initialValues={{}}
                            onFinish={(e) => this.onFinish(e)}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入邮箱' },
                                { type: 'email', message: '邮箱格式不正确' }]}
                            >
                                <Input onChange={(e) => this.changeUsername(e)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' },
                                { min: 6, message: '密码最少6位' }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="code"
                                rules={[{ required: true, message: '请输入验证码' }]}
                            >
                                <Row gutter={13}>
                                    <Col span={15}>
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="验证码"
                                        />
                                    </Col>
                                    <Col span={9}>
                                        <CodeButton username={username} module="login"></CodeButton>
                                    </Col>

                                </Row>

                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>登录</Button>

                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);