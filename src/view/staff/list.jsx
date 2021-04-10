import React, { Component } from 'react';
import CustomTable from '@/components/CustomTable'
import { Link } from "react-router-dom"
import { Button, message, Switch } from "antd"
import { requestData } from "@/http/api/comm"
import requestUrl from "@/http/api/requestUrl"


class StaffList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            config: {
                rowKey: "staff_id",
                selection: true,
                queryUrl: 'staffList',
                columns: [
                    {
                        title: '职员名称',
                        dataIndex: 'full_name'
                    },
                    {
                        title: '手机号',
                        dataIndex: 'phone'
                    },
                    {
                        title: '职位名称',
                        dataIndex: 'jobName',
                    },
                    {
                        title: '部门名称',
                        dataIndex: 'name',
                        align: 'center',
                    },
                    {
                        title: '禁启用',
                        align: 'center',
                        render: (row) => <Switch checked={row.status} onChange={(e) => this.changeSwitch(e, row.staff_id)}/>

                    },
                    {
                        title: '入职日期',
                         align: 'center',
                         dataIndex:'job_entry_date'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 200,
                        render: (row) => (
                            <div className="inline-button">
                                <Button type="primary"><Link to={{ pathname: '/staff/add', state: { id: row.staff_id } }}>编辑</Link></Button>
                                <Button onClick={() => this.tableRef.onDelete(row.staff_id)} danger>删除</Button>
                            </div>
                        )
                    },
                ],
            }
        }

    }
    getChildRef = (ref) => {
        this.tableRef = ref
    }
    changeSwitch = async (status, staff_id) => {
        const { data: res } = await requestData({
            url: requestUrl['staffStatus'],
            data: { id: staff_id, status }
        }).catch(err => err)
        if (res.resCode !== 0) {
            message.error(res.message)
            return
        }
        message.success('操作成功')
        this.tableRef.getDataList()
    }
    render () {
        let { config } = this.state
        return <CustomTable config={config} getChildRef={this.getChildRef}></CustomTable>
    }
}

export default StaffList;
