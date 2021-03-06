import React, { Component } from 'react';
import { Form, Button, Input, Radio, InputNumber, Select } from "antd"


const width = '200px'
class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.form = React.createRef()
        this.state = {
            hintType: {
                'Input': '请输入',
                'TextArea': '请输入',
                'InputNumber': '请输入',
                'Radio': '请选择'
            }
        }
    }


    onFinish = (e) => {
        const searchValue = {}
        for (let key in e) {
            if (e[key] !== undefined && e[key] !== '') {
                searchValue[key] = e[key]
            }
        }
        this.props.onSubmit(searchValue)
    }

    onReset = () => {
        this.form.current.resetFields()
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
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name} >
                <Input placeholder={item.placeholder || this.marked(item)} style={{ width: width }} />
            </Form.Item>
        )
    }

    elemTextArea = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name} >
                <Input.TextArea placeholder={item.placeholder || this.marked(item)} style={{ width: width }} />
            </Form.Item>
        )
    }

    elemInputNumber = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name} >
                <InputNumber min={item.min} max={item.max} placeholder={item.placeholder || this.marked(item)} style={{ width: width }} />
            </Form.Item>
        )
    }

    elemRadio = (item) => {
        return (
            <Form.Item label={item.label} name={item.name} rules={this.rules(item)} key={item.name}>
                <Radio.Group style={{ width: width }}>
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
                <Select style={{ width: width }}>
                    {
                        item.options && item.options.map(elem => {
                            return <Select.Option value={elem.value} key={elem.value}>{elem.label}</Select.Option>
                        })
                    }
                </Select>
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
        })
        return FormItemList
    }

    render () {
        let { style } = this.props
        return (
            <div>
                <Form layout="inline" ref={this.form} onFinish={this.onFinish} style={style}>
                    {this.initialize()}
                    <Form.Item className="inline-button">
                        <Button type="primary" htmlType="submit">搜索</Button>
                        <Button type="default" onClick={this.onReset}>重置</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default SearchForm;