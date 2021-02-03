import React, { Component } from 'react';
import './style.less'
import { Menu } from "antd"
import { RightOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

class SilderBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            list: [
                {
                    name: '首页',
                    key: 1
                },
                {
                    name: '首页',
                    key: 2
                },
                {
                    name: '首页',
                    key: 3
                },
            ]
        }
    }
    changeActiveIndex = (val)=>{
        this.setState({
            activeIndex:val
        })
    }
    render() {
        const { list, activeIndex } = this.state
        return (
            <div className="slider-bar-wrapper">
                <div className="silder-bar-header">logo</div>
                <div className="silder-bar-content">
                    <div className="silder-menu-wrapper">
                        <div className="silder-menu">
                            {/* <div className="silder-menu-item ">
                                <div className="silder-menu-item-inner ">
                                    <SettingOutlined className="menu-item-icon silder-menu-item-icon-left" />
                                    <div className="silder-menu-item-title">首页</div>
                                    {true && <RightOutlined className="menu-item-icon silder-menu-item-icon-rigrt" />}
                                </div>
                            </div>
                            <div className="silder-menu-item active">
                                <div className="silder-menu-item-inner active">
                                    <SettingOutlined className="menu-item-icon silder-menu-item-icon-left" />
                                    <div className="silder-menu-item-title">首页</div>
                                    {true && <RightOutlined className="menu-item-icon silder-menu-item-icon-rigrt" />}
                                </div>
                            </div> */}
                            {
                                list.map(item => {
                                    return (
                                        <div key={item.key} onClick={()=>this.changeActiveIndex(item.key)} className={activeIndex === item.key ? "silder-menu-item active" : "silder-menu-item"}>
                                            <div className={activeIndex === item.key ? "silder-menu-item-inner active" : "silder-menu-item-inner"}>
                                                <SettingOutlined className="menu-item-icon silder-menu-item-icon-left" />
                                                <div className="silder-menu-item-title">{item.name}</div>
                                                {true && <RightOutlined className="menu-item-icon silder-menu-item-icon-rigrt" />}
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SilderBar;