import React, { Component } from 'react';
import { Form, Button, Input, Radio, InputNumber, message } from "antd"
import { departmentAdd } from "@/http/api/department"

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
};

class DepartmentAdd extends Component {

    onSubmit = async (e) => {
        console.log(e)
        const { data: res } = await departmentAdd(e).catch(err => err)
        if (res.resCode !== 0) {
            message.error(res.message)
            return
        }
        message.success(res.message)
    }
    render () {
        return (
            <div>
                <Form {...layout} onFinish={this.onSubmit} initialValues={{ status: false, number: 0 }}>
                    <Form.Item
                        label="部门名称"
                        name="name"
                        rules={[{ required: true, message: '请输入部门名称' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="人员数量"
                        name="number"
                        rules={[{ required: true, message: '请输入人员数量' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="禁启用"
                        name="status"
                        rules={[{ required: true, message: '请选择禁启用项' }]}
                    >
                        <Radio.Group>
                            <Radio value={false}>禁用</Radio>
                            <Radio value={true}>启用</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="content"
                        rules={[{ required: true, message: '请输入描述' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default DepartmentAdd