import React, { Component } from 'react';
import { Form, Button, Input, Radio, InputNumber, message } from "antd"
import { departmentAdd, departmentDetailed, departmentEdit } from "@/http/api/department"

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
};

class DepartmentAdd extends Component {
    constructor(props) {
        super(props)
        this.departmentAddRef = React.createRef()
        this.state = {
            id: '',
            butLoading: false
        }

    }
    componentDidMount () {
        console.log(this.props.location.state)
        if (this.props.location.state) {
            let { id } = this.props.location.state
            this.getDepartmentDetailed(id)
            this.setState({ id })
        }

    }
    getDepartmentDetailed = async (id) => {
        const { data: res } = await departmentDetailed({ id }).catch(err => err)
        if (res.resCode !== 0) {
            message.error(res.message)
            return
        }
        this.departmentAddRef.current.setFieldsValue(res.data)
    }
    onAdd = async (query) => {
        this.setButLoading(true)

        const { data: res } = await departmentAdd(query).catch(err => err)
        if (res.resCode !== 0) {
            this.setButLoading(false)
            message.error(res.message)
            return
        }
        this.setButLoading(false)
        this.departmentAddRef.current.resetFields()
        message.success('添加成功')
    }
    onEdit = async (query) => {
        this.setButLoading(true)
        query.id = this.state.id
        const { data: res } = await departmentEdit(query).catch(err => err)
        if (res.resCode !== 0) {
            this.setButLoading(false)
            message.error(res.message)
            return
        }
        this.setButLoading(false)
        message.success('编辑成功')
    }
    onSubmit = async (e) => {
        this.state.id ? this.onEdit(e) : this.onAdd(e)
    }
    setButLoading = (val) => {
        this.setState({
            butLoading: val
        })
    }
    render () {
        let { butLoading } = this.state
        return (
            <div>
                <Form {...layout} onFinish={this.onSubmit} ref={this.departmentAddRef} initialValues={{ name: '', status: false, number: 0, content: '' }}>
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
                        <Button type="primary" htmlType="submit" loading={butLoading}>保存</Button>
                    </Form.Item>
                </Form>
            </div >
        );
    }
}

export default DepartmentAdd