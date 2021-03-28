import React, { Component } from 'react';
import CustomForm from '@/components/CustomForm'
import { requestData } from "@/http/api/comm"
import requestUrl from "@/http/api/requestUrl"
import { message, Select } from "antd"


class PositionAdd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectList: [],
            config: {
                queryUrl: 'positionAdd',
                initialValues: {
                    status: false
                },
                setFieldValue: {},
                selectComponent: 'parentId',
                editKey: '',
                formItem: [
                    // {
                    //     type: 'SelectComponent',
                    //     label: "部门",
                    //     name: "parentId",
                    //     required: true,
                    //     url: 'departmentListAll',
                    //     labelInValue: {
                    //         label: 'name',
                    //         value: 'id'
                    //     }
                    // },
                    {
                        type: 'Slot',
                        slotName:'position',
                        label: "部门",
                        name: "parentId",
                        required: true
                    },
                    {
                        type:'Upload',
                        label:'头像',
                        name:'avatar',
                        required:true
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
    componentDidMount () {
        if (this.props.location.state) {
            let { id } = this.props.location.state
            this.getDepartmentDetailed(id)
        }
        this.getSelectList()
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

    getSelectList = async () => {
        let query = {
            url: requestUrl['departmentListAll'],
            data: {}
        }
        const { data: res } = await requestData(query).catch(err => err)
        if (res.resCode !== 0) {
            return
        }
        this.setState({
            selectList: res.data.data
        })
    }



    render () {
        let { config,selectList } = this.state
        return (
            <CustomForm config={config}>
                {/* 插槽 */}
                <Select ref="position">
                    {
                        selectList && selectList.map(item => {
                            return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                        })
                    }
                </Select>
            </CustomForm>
        )




    }
}

export default PositionAdd;