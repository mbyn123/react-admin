import React, { Component } from 'react';
import { message } from "antd"
import { departmentAdd, departmentDetailed, departmentEdit } from "@/http/api/department"
import CustomForm from '@/components/CustomForm'


class DepartmentAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            butLoading: false,
            config: {
                initialValues: {
                    number: 0,
                    status: true
                },
                setFieldValue: {},
                formItem: [
                    {
                        type: 'Input',
                        label: "部门名称",
                        name: "name",
                        required: true
                    },
                    {
                        type: 'InputNumber',
                        label: "人员数量",
                        name: "number",
                        min: 0,
                        max: 100,
                        required: true
                    },
                    {
                        type: 'Radio',
                        label: "禁启用",
                        name: "status",
                        options: [{ label: '禁用', value: false }, { label: '启用', value: true }],
                        required: true
                    },
                    {
                        type: 'TextArea',
                        label: "描述",
                        name: "content",
                        required: true
                    }
                ]
            },

        }

    }
    componentDidMount () {
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
        this.setState({
            config: {
                ...this.state.config, setFieldValue: res.data
            }
        })
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
        console.log(4444,e)
        this.state.id ? this.onEdit(e) : this.onAdd(e)
    }
    setButLoading = (val) => {
        this.setState({
            butLoading: val
        })
    }
    render () {
        let { butLoading, config } = this.state
        return (
            <div>
                <CustomForm config={config} onSubmit={this.onSubmit}></CustomForm>
            </div >
        );
    }
}

export default DepartmentAdd