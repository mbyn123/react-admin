import React, { Component } from 'react';
import { Form, Input, Button, Table, message, Switch, Modal, Spin, Pagination } from "antd"
import { getDepartmentList, deleteDepartment, setDepartmentStatus } from "@/http/api/department"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"

import CustomTable from '@/components/CustomTable'

class DepartmentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                            <Button onClick={() => this.delete(row.id)} danger>删除</Button>
                        </div>
                    )
                },
            ],
            data: [],
            pagination: {
                current: 1,
                pageSize: 10
            },
            total: 0,
            keyWord: '',
            ids: '',
            loading: false
        }
    }

    componentDidMount () {
        this.getDataList()
    }
    getDataList = async () => {
        this.setLoading(true)
        let { pagination, keyWord } = this.state
        const { data: res } = await getDepartmentList(Object.assign({ name: keyWord }, {
            pageNumber: pagination.current,
            pageSize: pagination.pageSize,
        })).catch(err => err)
        if (res.resCode !== 0) {
            message.error(res.message)
            this.setLoading(false)
            return
        }
        this.setState({
            data: res.data.data,
            total: res.data.total
        })
        this.setLoading(false)
    }
    setLoading = (val) => {
        this.setState({ loading: val })
    }
    delete = async (id) => {
        if (!id) {
            message.warning('请选择删除项！')
            return
        }
        Modal.confirm({
            title: '确定删除当前选项?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk: async () => {
                const { data: res } = await deleteDepartment({ id }).catch(err => err)
                if (res.resCode !== 0) {
                    message.error(res.message)
                    return
                }
                this.getDataList()
                message.success('删除成功')
            },
            onCancel () {
                console.log('Cancel');
            },
        });
    }
    changeSwitch = async (status, id) => {
        const { data: res } = await setDepartmentStatus({ id, status }).catch(err => err)
        if (res.resCode !== 0) {
            message.error(res.message)
            return
        }
        message.success('操作成功')
        this.getDataList()
    }
    changeCheck = (e) => {
        this.setState({ ids: e.join(',') })
    }
    changePage = (current, pageSize) => {
        this.setState({
            pagination: { current, pageSize }
        }, () => {
            this.getDataList()
        })
    }
    onSearch = (e) => {
        this.setState({ keyWord: e.name })
        this.getDataList()
    }
    render () {
        let { columns, data, loading, pagination, total, ids } = this.state
        const rowSelection = { onChange: this.changeCheck }
        return (
            <Spin tip="Loading..." spinning={loading} size="large">
                <Form layout="inline" initialValues={{ name: '' }} onFinish={this.onSearch} className="margin-bottom">
                    <Form.Item label="部门名称" name="name">
                        <Input placeholder="请输入部门名称"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <div>
                    <CustomTable rowKey="id" dataSource={data} columns={columns}></CustomTable>
                    {/* <Table rowKey="id" dataSource={data} columns={columns} pagination={false} bordered rowSelection={{ ...rowSelection }} /> */}
                    <div className="table-footer">
                        <Button onClick={() => this.delete(ids)} danger>批量删除</Button>
                        <Pagination {...pagination} total={total} showSizeChanger showQuickJumper onChange={this.changePage} showTotal={total => `共 ${total} 条`}></Pagination>
                    </div>
                </div>
            </Spin>
        );
    }
}

export default DepartmentList;