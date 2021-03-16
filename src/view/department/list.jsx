import React, { Component } from 'react';
import { Button, message, Switch } from "antd"
import { Link } from "react-router-dom"
import { requestData } from "@/http/api/comm"
import requestUrl from "@/http/api/requestUrl"
import CustomTable from '@/components/CustomTable'

class DepartmentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyWord: '',
            config: {
                rowKey: "id",
                selection: true,
                queryUrl: 'departmentList',
                columns: [
                    {
                        title: '部门名称',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: '部门人数',
                        dataIndex: 'number',
                        align: 'center',
                        key: 'number',
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
                searchConfig: {
                    formItem: [
                        {
                            type: 'Input',
                            label: "部门名称",
                            name: "name",
                        },
                        {
                            type: 'Select',
                            label: "禁启项",
                            name: "status",
                            options: [
                                { label: '禁用', value: false },
                                { label: '启用', value: true }
                            ]
                        },
                    ]
                }
            },
        }
    }
    // 获取子组件实例
    getChildRef = (ref) => {
        this.tableRef = ref
    }

    changeSwitch = async (status, id) => {
        const { data: res } = await requestData({
            url: requestUrl['departmentStatus'],
            data: { id, status }
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
        return <CustomTable getChildRef={this.getChildRef} config={config}></CustomTable>
    }
}

export default DepartmentList;