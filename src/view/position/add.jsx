import React, { Component } from 'react';
import CustomForm from '@/components/CustomForm'


class PositionAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            config: {
                queryUrl:'positionAdd',
                initialValues: {
                    status: false
                },
                setFieldValue: {},
                formItem: [
                    {
                        type: 'Input',
                        label: "职位名称",
                        name: "jobName",
                        required: true
                    },
                    {
                        type: 'Input',
                        label: "部门id",
                        name: "parentId",
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

    render () {
        let { config } = this.state
        return (
            <div>
                <CustomForm config={config}></CustomForm>
            </div>
        );
    }
}

export default PositionAdd;