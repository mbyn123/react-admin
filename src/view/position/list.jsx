import React, { Component } from 'react';
import CustomTable from '@/components/CustomTable'
import { Link } from "react-router-dom"
import { Button, message, Switch } from "antd"

class PositionList extends Component {
    constructor(props){
        super(props)
        this.state={
            config:{
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
                        render: (row) => <Switch checked={row.status} onChange={(e) => this.changeSwitch(e, row.id)} />

                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 200,
                        render: (row) => (
                            <div className="inline-button">
                                <Button type="primary"><Link to={{ pathname: '/department/add', state: { id: row.id } }}>编辑</Link></Button>
                                <Button onClick={() => this.tableRef.onDelete(row.id)} danger>删除</Button>
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
    render() {
        let {config} = this.state
        return <CustomTable config={config} getChildRef={this.getChildRef}></CustomTable>
    }
}

export default PositionList;