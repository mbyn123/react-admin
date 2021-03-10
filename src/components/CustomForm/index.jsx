import React, { Component } from 'react';
import { Form, Button, Input, Radio, InputNumber, Spin, message } from "antd"
import { requestData } from "@/http/api/comm"
import requestUrl from "@/http/api/requestUrl"


const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
};

class CustomForm extends Component {
    constructor(props) {
        super(props)
        this.form = React.createRef()
        this.state = {
            hintType: {
                'Input': '请输入',
                'TextArea': '请输入',
                'InputNumber': '请输入',
                'Radio': '请选择'
            },
            loading: false
        }
    }

    // 监听props是否变化
    componentDidUpdate () {
        if (this.props.config.setFieldValue) {
            this.form.current.setFieldsValue(this.props.config.setFieldValue)
        }
    }
    onFinish = (e) => {
        if (this.props.onSubmit) {
            this.props.onSubmit(e)
            return
        }
        this.uploadData(e)
    }

    uploadData = async (val) => {
        this.setState({ loading: true })
        let { queryUrl } = this.props.config
        let query = {
            url: requestUrl[queryUrl],
            method: 'POST',
            data: val
        }
        const {data:res} = await requestData(query).catch(err => err)
        console.log(res)
        if (res.resCode !== 0) {
            message.error(res.message)
            this.setState({ loading: false })
            return
        }
        message.success(res.message)
        this.setState({ loading: false })
    }

    marked = (item) => {
        return this.state.hintType[item.type] + item.label
    }

    rules = (item) => {
        let rules = []
        if (item.required) {
            let message = this.marked(item)
            rules.push({ required: true, message })
        }
        if (item.rules) {
            rules = rules.concat(item.rules)
        }
        return rules
    }

    elemInput = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name}>
                <Input placeholder={item.placeholder || this.marked(item)} style={{ width: '100%' }} />
            </Form.Item>
        )
    }

    elemTextArea = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name}>
                <Input.TextArea placeholder={item.placeholder || this.marked(item)} style={{ width: '100%' }} />
            </Form.Item>
        )
    }

    elemInputNumber = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name}>
                <InputNumber min={item.min} max={item.max} placeholder={item.placeholder || this.marked(item)} style={{ width: '100%' }} />
            </Form.Item>
        )
    }

    elemRadio = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name}>
                <Radio.Group>
                    {
                        item.options && item.options.map(elem => {
                            return <Radio value={elem.value} key={elem.value}>{elem.label}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        )
    }

    initialize = () => {
        let { formItem } = this.props.config
        if (!formItem || (formItem && formItem.length === 0)) { return false }
        let FormItemList = []
        formItem.forEach(item => {
            item.type === 'Input' && FormItemList.push(this.elemInput(item))
            item.type === 'InputNumber' && FormItemList.push(this.elemInputNumber(item))
            item.type === 'Radio' && FormItemList.push(this.elemRadio(item))
            item.type === 'TextArea' && FormItemList.push(this.elemTextArea(item))
        })
        return FormItemList
    }

    render () {
        let { initialValues } = this.props.config
        return (
            <Spin tip="Loading..." spinning={this.state.loading} size="large">
                <Form {...layout} ref={this.form} initialValues={initialValues} onFinish={this.onFinish}>
                    {this.initialize()}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </Spin>
        );
    }
}

export default CustomForm;