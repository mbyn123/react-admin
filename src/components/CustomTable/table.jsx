import React from 'react';
import { Button, Table, Pagination, Row, Col } from "antd"

const TableComponent = (props) => {
    let { rowSelection, selection, dataSource, columns, rowKey, pagination, total, changePageCurrent, changeDatele } = props
    return (
        <>
            <Table rowSelection={selection && {...rowSelection}} rowKey={rowKey} dataSource={dataSource} columns={columns} pagination={false} bordered></Table>
            <div className="space-20"></div>
            <Row>
                <Col span={12}>{selection && <Button onClick={changeDatele} danger>批量删除</Button>}</Col>
                <Col span={12}><Pagination className='full-right' {...pagination} total={total} showSizeChanger showQuickJumper onChange={changePageCurrent} showTotal={total => `共 ${total} 条`}></Pagination></Col>
            </Row>
        </>
    )
}

export default TableComponent;