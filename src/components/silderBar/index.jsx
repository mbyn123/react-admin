import React, { Component } from 'react';
import './style.less'
import { Menu } from "antd"
import { RightOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

class SilderBar extends Component {
    render () {
        return (
            <div className="slider-bar-wrapper">
                <div className="silder-bar-header">logo</div>
                <div className="silder-bar-content">
                    <div className="silder-menu-wrapper">
                        <div className="silder-menu">
                            <div className="silder-menu-item active">
                                <SettingOutlined className="menu-item-icon silder-menu-item-icon-left"/>
                                <div className="silder-menu-item-title">数据统计</div>
                                {false && <RightOutlined className="menu-item-icon silder-menu-item-icon-rigrt"/>}
                            </div>
                            {/* <div className="silder-menu-item">
                                <SettingOutlined className="menu-item-icon silder-menu-item-icon-left"/>
                                <div className="silder-menu-item-title">数据统计</div>
                                <RightOutlined className="menu-item-icon silder-menu-item-icon-rigrt"/>
                            </div>
                            <div className="silder-menu-item">
                                <SettingOutlined className="menu-item-icon silder-menu-item-icon-left"/>
                                <div className="silder-menu-item-title">数据统计统计统计</div>
                                <RightOutlined className="menu-item-icon silder-menu-item-icon-rigrt"/>
                            </div>
                            <div className="silder-menu-item">
                                <SettingOutlined className="menu-item-icon silder-menu-item-icon-left"/>
                                <div className="silder-menu-item-title">数据统计</div>
                                <RightOutlined className="menu-item-icon silder-menu-item-icon-rigrt"/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SilderBar;