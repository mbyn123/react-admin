import React, { Component } from 'react';
import './style.less'
import { Menu } from "antd"
import { MailOutlined } from '@ant-design/icons';
import router from '@/router'
import { Link, withRouter } from "react-router-dom"
import path from "@/utils/routerConfig"

const { SubMenu } = Menu;

class SilderBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedKeys: [], // 当前选中的菜单项
            openKeys: [], //当前展开的 SubMenu 菜单项
        }
    }

    componentDidMount () {
        const pathName = this.props.location.pathname
        const subPathName = this.setMenuPath(pathName)
        this.setState({
            selectedKeys: [pathName === "/" ? path : pathName],
            openKeys: [subPathName === "/" ? this.setMenuPath(path) : subPathName]
        })
    }

    setMenuPath = (val)=>{
       return val.split("/").slice(0, 2).join("/")
    }

    selectMenu = ({ key, keyPath }) => {
        this.setState({
            selectedKeys: [key],
            openKeys: [keyPath[keyPath.length - 1]]
        })
    }

    openMenu = (openKeys) => {
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }

    renderMenuItem = ({ key, title }) => {
        return <Menu.Item key={key}><Link to={key}>{title}</Link></Menu.Item>
    }

    renderSubMenu = ({ title, key, child }) => {
        return (
            <SubMenu key={key} icon={<MailOutlined />} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </SubMenu>
        )
    }

    render () {
        const { openKeys, selectedKeys } = this.state
        return (
            <div className="silder-bar-wrapper">
                <div className="logo-box">
                    <div className="logo-inner"></div>
                </div>
                <Menu
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    mode="inline"
                    theme="dark"
                    className="menu-wrapper"
                    onClick={this.selectMenu}
                    onOpenChange={this.openMenu}
                >
                    {
                        router && router.map(item => {
                            return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                        })
                    }
                </Menu>
            </div>

        )
    }
}

export default withRouter(SilderBar);