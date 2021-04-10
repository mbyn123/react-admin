import React, { Component } from 'react';
import CustomForm from '@/components/CustomForm'
import { requestData } from "@/http/api/comm"
import requestUrl from "@/http/api/requestUrl"
import { message } from "antd"
import { nation, face, education } from '@/utils/data'

class StaffAdd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectList: [],
            config: {
                queryUrl: 'staffAdd',// 接口地址
                initialValues: {},// 默认表单值
                setFieldValue: {},// 更改后的表单值
                editKey: '',// 编辑表单时的key或id
                formItem: [
                    {
                        type: 'cloum',
                        label: '个人信息'
                    },
                    {
                        type: 'Input',
                        label: "姓名",
                        name: "name",
                        required: true
                    },
                    {
                        type: 'Radio',
                        label: "性别",
                        name: "sex",
                        options: [{ label: '男', value: true }, { label: '女', value: false }],
                        required: true
                    },
                    {
                        type: 'Upload',
                        label: '头像',
                        name: 'face_img',
                        required: true
                    },

                    {
                        type: 'Input',
                        label: "身份证号",
                        name: "card_id",
                        required: true
                    },
                    {
                        type: 'Date',
                        label: "出生日期",
                        name: "birthday",
                        required: true,
                        format: 'YYYY/MM/DD',
                    },

                    {
                        type: 'Select',
                        label: "民族",
                        name: "nation",
                        options: nation,
                        required: true
                    },
                    {
                        type: 'Select',
                        label: "政治面貌",
                        name: "political",
                        options: face,
                        required: true
                    },
                    {
                        type: 'Input',
                        label: "毕业院校",
                        name: "school",
                        required: true
                    },
                    {
                        type: 'Select',
                        label: "学历",
                        options: education,
                        name: "education",
                        required: true
                    },

                    {
                        type: 'Input',
                        label: "所学专业",
                        name: "major",
                        required: true
                    },
                    {
                        type: 'Upload',
                        label: '毕业证',
                        name: 'diploma_img',
                        required: true
                    },
                    {
                        type: 'Input',
                        label: "手机",
                        name: "phone",
                        required: true,
                        rules: [
                            ({ getFieldValue }) => ({
                                validator (_, value) {
                                    let regPhone = /^1[3456789]\d{9}$/
                                    if (regPhone.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('手机号格式不正确'));
                                },
                            }),
                        ]
                    },
                    {
                        type: 'Input',
                        label: "微信号",
                        name: "wechat",
                        required: true
                    },
                    {
                        type: 'Input',
                        label: "邮箱",
                        name: "email",
                        required: true,
                        rules: [
                            { type: 'email', message: '邮箱格式不正确' }
                        ]
                    },

                    {
                        type: 'cloum',
                        label: '就职信息'
                    },
                    {
                        type: 'SelectComponent',
                        label: "部门",
                        name: "departmen_id",
                        required: true,
                        url: 'departmentListAll',
                        labelInValue: {
                            label: 'name',
                            value: 'id'
                        }
                    },
                    {
                        type: 'SelectComponent',
                        label: "职位",
                        name: "job_id",
                        required: true,
                        url: 'positionListAll',
                        labelInValue: {
                            label: 'jobName',
                            value: 'jobId'
                        }
                    },
                    {
                        type: 'Inline',
                        label: "职员状态",
                        name: "job_status",
                        required: true,
                        InlineItem: [
                            {
                                type: 'Date',
                                label: "入职时间",
                                name: "job_entry_date",
                                required: true,
                            },
                            {
                                type: 'Date',
                                label: "转正时间",
                                name: "job_formal_date",
                                required: true,
                                format: 'YYYY/MM/DD',
                            },
                            {
                                type: 'Date',
                                label: "离职时间",
                                name: "job_quit_date",
                                required: true,
                                format: 'YYYY/MM/DD',
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: "公司邮箱",
                        name: "company_email",
                        required: true
                    },
                    {
                        type: 'Editor',
                        label: "描述",
                        name: "introduce",
                        required: true
                    },
                ]
            },

        }

    }
    render () {
        let { config } = this.state
        return (
            <CustomForm config={config}></CustomForm>
        );
    }
}

export default StaffAdd;
