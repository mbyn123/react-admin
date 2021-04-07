import React, { Component } from 'react';
import { Form, Button, Input, Radio, InputNumber, Spin, message, Select, DatePicker } from "antd"
import { requestData } from "@/http/api/comm"
import requestUrl from "@/http/api/requestUrl"
import Selects from '@/components/Select'
import UploadFile from '@/components/upload'
import Editor from '@/components/Editor'

import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

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
                'Radio': '请选择',
                'Select': '请选择',
                'SelectComponent': '请选择',
                'Slot': '请选择',
                'Upload': '请上传',
                'Date': '请选择',
                'Editor':'请输入'
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
    onFinish = async (val) => {
        let key = this.props.config.selectComponent

        if (key && val[key] && Object.prototype.toString.call(val[key]) === '[object Object]') {
            let value = val[key]
            delete val[key]
            val = Object.assign(value, val)
        }

        if (this.props.onSubmit) {
            this.props.onSubmit(val)
            return
        }

        this.setState({ loading: true })
        let { queryUrl, editKey, setFieldValue } = this.props.config
        let query = {
            url: requestUrl[queryUrl],
            method: 'POST',
            data: val
        }
        if (editKey) {
            query.data[editKey] = setFieldValue[editKey]
        }
        const { data: res } = await requestData(query).catch(err => err)
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

    checkPrice = (rule, value) => {
        if (!value) {
            return Promise.reject(new Error('请选择'));
        }
        return Promise.resolve();
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

    elemSelect = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name}>
                <Select >
                    {
                        item.options && item.options.map(elem => {
                            return <Select.Option value={elem.value} key={elem.value}>{elem.label}</Select.Option>
                        })
                    }
                </Select >
            </Form.Item>
        )
    }

    elemSelectComponent = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={[{ required: true, validator: this.checkPrice }]} key={item.name}>
                <Selects name={item.name} labelInValue={item.labelInValue} url={item.url}></Selects>
            </Form.Item>
        )
    }

    elemSoltComponent = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name}>
                {this.props.children && Array.isArray(this.props.children) ? this.props.children.filter(elem => elem.ref === item.slotName)[0] : this.props.children}
            </Form.Item>
        )
    }

    elemUploadComponent = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name}>
                <UploadFile></UploadFile>
            </Form.Item>
        )
    }

    elemcloumComponent = (item) => {
        return (
            <div className="form-cloum" key={item.label}>
                <h4>{item.label}</h4>
            </div>
        )
    }

    elemDateComponent = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name}>
                <DatePicker format={item.format} picker={item.picker} locale={locale}></DatePicker>
            </Form.Item>
        )
    }

    elemEditorComponent = (item) => {
        return (
            <Form.Item label={item.label} rules={this.rules(item)}  name={item.name} key={item.name}>
               <Editor></Editor>
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
            item.type === 'Select' && FormItemList.push(this.elemSelect(item))
            item.type === 'SelectComponent' && FormItemList.push(this.elemSelectComponent(item))
            item.type === 'Slot' && FormItemList.push(this.elemSoltComponent(item))
            item.type === 'Upload' && FormItemList.push(this.elemUploadComponent(item))
            item.type === 'cloum' && FormItemList.push(this.elemcloumComponent(item))
            item.type === 'Date' && FormItemList.push(this.elemDateComponent(item))
            item.type === 'Editor' && FormItemList.push(this.elemEditorComponent(item))
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