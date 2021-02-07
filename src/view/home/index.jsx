import React, { Component } from 'react'
import "./style.less"
import { Layout } from "antd"
import SilderBar from "@/components/silderBar"
import Main from "@/components/main"
const { Header, Sider, Content } = Layout;

class Home extends Component {
    render () {
        return (
            <Layout className="layout-wrapper">
                <Sider className="layout-sider-wrapper">
                    <SilderBar></SilderBar>
                </Sider>
                <Layout>
                    <Header className="layout-header-wrapper">Header</Header>
                    <Content className="layout-content-wrapper">
                        <Main></Main>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Home