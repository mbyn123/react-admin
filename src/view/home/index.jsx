import React, { Component } from 'react'
import "./style.less"
import SilderBar from '@/components/silderBar'
import { Layout } from 'antd'
const { Header, Content,Sider } = Layout;

class Home extends Component {
    render() {
        return (
            <Layout className="layout-wrapper">
                <Sider className="layout-sider-wrapper"><SilderBar></SilderBar></Sider>   
                <Layout>
                    <Header className="layout-header-wrapper"></Header>
                    <Content className="layout-content-wrapper"></Content>
                </Layout>
            </Layout>
        )
    }
}

export default Home