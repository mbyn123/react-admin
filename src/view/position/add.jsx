import React, { Component } from 'react';
import CustomForm from '@/components/CustomForm'
import { requestData } from "@/http/api/comm"
import requestUrl from "@/http/api/requestUrl"
import { message } from "antd"


class PositionAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            config: {
                queryUrl: 'positionAdd',
                initialValues: {
                    status: false
                },
                setFieldValue: {},
                selectComponent: 'parentId',
                editKey: '',
                formItem: [
                    {
                        type: 'SelectComponent',
                        label: "部门",
                        name: "parentId",
                        required: true,
                        url: 'departmentListAll',
                        labelInValue: {
                            label: 'name',
                            value: 'id'
                        }
                    },
                    {
                        type: 'Input',
                        label: "职位名称",
                        name: "jobName",
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
    componentDidMount() {
        if (this.props.location.state) {
            let { id } = this.props.location.state
            this.getDepartmentDetailed(id)
        }

    }
    getDepartmentDetailed = async (id) => {
        const { data: res } = await requestData({ url: requestUrl['positionDetailed'], data: { id } }).catch(err => err)
        if (res.resCode !== 0) {
            message.error(res.message)
            return
        }
        this.setState({
            config: {
                ...this.state.config,
                setFieldValue: res.data,
                queryUrl: 'positionEdit',
                editKey: 'jobId'
            }
        })
    }



    render() {
        let { config } = this.state
        return <CustomForm config={config}></CustomForm>




    }
}

export default PositionAdd;