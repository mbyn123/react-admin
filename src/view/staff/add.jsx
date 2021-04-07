import React, { Component } from 'react';
import CustomForm from '@/components/CustomForm'
import { requestData } from "@/http/api/comm"
import requestUrl from "@/http/api/requestUrl"
import { message } from "antd"
import {nation,face,education} from '@/utils/data'

class StaffAdd extends Component {
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
                editKey: '',
                formItem: [
                    {
                       type:'cloum',
                       label:'个人信息'
                    },
                    {
                        type:'Upload',
                        label:'头像',
                        name:'avatar',
                        required:true
                    },
                    {
                        type: 'Input',
                        label: "姓名",
                        name: "jobName",
                        required: true
                    },
                    {
                        type: 'Radio',
                        label: "性别",
                        name: "status",
                        options: [{ label: '男', value: false }, { label: '女', value: true }],
                        required: true
                    },
                    {
                        type: 'Input',
                        label: "身份证号",
                        name: "jobName2",
                        required: true
                    },
                    {
                        type: 'Date',
                        label: "出生日期",
                        name: "jobName1222",
                        required: true,
                        format:'YYYY/MM/DD',
                        // picker:'month'
                    },
                    {
                        type: 'Input',
                        label: "手机",
                        name: "jobName29",
                        required: true
                    },
                    {
                        type: 'Select',
                        label: "民族",
                        name: "jobName27",
                        options:nation,
                        required: true
                    },
                    {
                        type: 'Select',
                        label: "政治面貌",
                        name: "jobName25",
                        options:face,
                        required: true
                    },
                    {
                        type: 'Input',
                        label: "毕业院校",
                        name: "jobName32",
                        required: true
                    },
                    {
                        type: 'Input',
                        label: "所学专业",
                        name: "jobName222",
                        required: true
                    },
                    {
                        type: 'Select',
                        label: "学历",
                        options:nation,
                        name: "jobName12",
                        required: true
                    },
                    {
                        type: 'Input',
                        label: "微信号",
                        name: "jobName20",
                        required: true
                    },
                    {
                        type: 'Input',
                        label: "电话",
                        name: "jobName21",
                        required: true
                    },
                   
                    {
                        type:'cloum',
                        label:'就职信息'
                     },
                     {
                        type: 'Select',
                        label: "职位",
                        name: "jobName207",
                        options:[],
                        required: true
                    },
                    {
                        type: 'Input',
                        label: "公司邮箱",
                        name: "jobName219",
                        required: true
                    },
                    {
                        type: 'Editor',
                        label: "描述",
                        name: "jobName2129",
                        required: true
                    },
                ]
            },

        }

    }
    render() {
        let { config } = this.state
        return (
            <CustomForm config={config}></CustomForm>
        );
    }
}

export default StaffAdd;
