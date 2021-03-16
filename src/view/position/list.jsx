import React, { Component } from 'react';
import CustomTable from '@/components/CustomTable'
import { Link } from "react-router-dom"
import { Button, message, Switch } from "antd"
import { requestData } from "@/http/api/comm"
import requestUrl from "@/http/api/requestUrl"

class PositionList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            config: {
                rowKey: "jobId",
                selection: true,
                queryUrl: 'positionList',
                columns: [
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
                        render: (row) => <Switch checked={row.status} onChange={(e) => this.changeSwitch(e, row.jobId)} />

                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 200,
                        render: (row) => (
                            <div className="inline-button">
                                <Button type="primary"><Link to={{ pathname: '/position/add', state: { id: row.jobId } }}>编辑</Link></Button>
                                <Button onClick={() => this.tableRef.onDelete(row.jobId)} danger>删除</Button>
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
    changeSwitch = async (status, jobId) => {
        const { data: res } = await requestData({
            url: requestUrl['positionStatus'],
            data: { id: jobId, status }
        }).catch(err => err)
        if (res.resCode !== 0) {
            message.error(res.message)
            return
        }
        message.success('操作成功')
        this.tableRef.getDataList()
    }
    render() {
        let { config } = this.state
        return <CustomTable config={config} getChildRef={this.getChildRef}></CustomTable>
    }
}

export default PositionList;