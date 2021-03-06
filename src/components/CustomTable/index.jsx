import React, { Component } from 'react';
import { message, Modal, Spin } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import requestUrl from "@/http/api/requestUrl"
import { requestData } from "@/http/api/comm"
import TableComponent from '@/components/CustomTable/table'
import SearchForm from '@/components/searchForm'

class CustomTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pagination: {
                current: 1,
                pageSize: 10
            },
            total: 0,
            ids: '',
            loading: false,
            searchValue: {},
            data: []
        }
    }

    componentDidMount () {
        this.getDataList()
        this.props.getChildRef &&this.props.getChildRef(this)
    }

    getDataList = async () => {
        this.setLoading(true)
        let { queryUrl } = this.props.config
        let { pagination, searchValue } = this.state
        let query = {
            url: requestUrl[queryUrl],
            method: 'POST',
            data: {
                pageNumber: pagination.current,
                pageSize: pagination.pageSize,
            }
        }
        // 判断对象是否为空 方法1
        if (Object.keys(searchValue).length !== 0) {
            for (let key in searchValue) {
                query.data[key] = searchValue[key]
            }
        }
        // 判断对象是否为空 方法2
        // if(JSON.stringify(searchValue) !== '{}'){}


        const { data: res } = await requestData(query).catch(err => err)
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

    // 分页
    changePage = (current, pageSize) => {
        this.setState({ pagination: { current, pageSize } }, () => {
            this.getDataList()
        })
    }

    // 多选框
    changeCheckbox = (e) => {
        this.setState({ ids: e.join(',') })
    }

    // 删除
    onDelete = async (id) => {
        if (!id) {
            message.warning('请选择删除项！')
            return
        }
        let { queryUrl } = this.props.config
        let query = {
            url: requestUrl[`${queryUrl}Delete`],
            data: { id }
        }
        Modal.confirm({
            title: '确定删除当前选项?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk: async () => {
                const { data: res } = await requestData(query).catch(err => err)
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

    onSearch = (searchValue) => {
        this.setState({
            searchValue,
            pagination: { current: 1, pageSize: 10 }
        }, () => {
            this.getDataList()
        })
    }

    render () {
        let { columns, rowKey, selection, searchConfig } = this.props.config
        let { total, pagination, ids, data, loading } = this.state
        const rowSelection = { onChange: this.changeCheckbox }
        return (
            <Spin tip="Loading..." spinning={loading} size="large">
                <SearchForm config={searchConfig  || {}} onSubmit={this.onSearch} style={{ margin: '20px 0' }}></SearchForm>
                <TableComponent
                    selection={selection}
                    rowSelection={rowSelection}
                    rowKey={rowKey}
                    dataSource={data}
                    columns={columns}
                    total={total}
                    pagination={pagination}
                    changePageCurrent={this.changePage}
                    changeDatele={() => this.onDelete(ids)}
                ></TableComponent>
            </Spin>
        );
    }
}


export default CustomTable;
