import React, { Component } from 'react';
import './index.less'
import { Form, Input, Button, Row, Col ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { register } from '../../http/api/login'
import CodeButton from '../../components/codeButton'


class Register extends Component {
    async onFinish(val){
        console.log(val)
        const {data:res} = await register(val).catch(err=>err)
        console.log(res)
        if (res.resCode !== 0) {
            message.error(res.message)
            return
        }
    }
    onSearch = () => { }
    render () {
        const { changeType } = this.props

        return (
            <div className='login-wrapper'>
                <div className="login-box">
                    <div className="login-box-header">
                        <div className="text left">账号注册</div>
                        <div className="text right" onClick={() => changeType(1)}>登录</div>
                    </div>
                    <div className="login-form-wrapper">
                        <Form
                            className="login-form"
                            initialValues={{}}
                            onFinish={(e)=>this.onFinish(e)}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, message: '请输入邮箱' },
                                    { type: 'email', message: '邮箱格式不正确' }
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' },
                                { min: 6, message: '密码最少6位' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="passwords"
                                rules={[{ required: true, message: '请再次输入密码' },
                                ({ getFieldValue }) => ({
                                    validator (_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('两次密码输入不一致');

                                    },
                                }),]}
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
                                       <CodeButton></CodeButton>  
                                    </Col>

                                </Row>

                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>注册</Button>

                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;