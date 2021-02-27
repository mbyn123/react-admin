import React, { Component } from 'react';
import { Form, Input, Button, Table, message, Switch, Modal, Spin, Pagination } from "antd"



const CustomTable = (props) => {
    let { dataSource, columns, rowKey, total, pagination, changePage } = props
    const handChangePage = (page, pageSize) => {
        changePage(page, pageSize)
    }
    return (
        <div>
            <Table rowKey={rowKey} dataSource={dataSource} columns={columns} pagination={false} bordered></Table>
            <div className="table-footer">
                <Button onClick={() => this.delete(ids)} danger>批量删除</Button>
                <Pagination {...pagination} total={total} showSizeChanger showQuickJumper onChange={handChangePage} showTotal={total => `共 ${total} 条`}></Pagination>
            </div>
        </div>
    );
}


export default CustomTable;