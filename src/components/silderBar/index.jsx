import React, { Component } from 'react';
import './style.less'
import { RightOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
let subMenu = "silder-menu-sub-menu"

let subMenuInner = "silder-menu-sub-menu-inner"
let subMenuInnerActive = `${subMenuInner} sub-menu-inner-active`
let sublevelItem = "menu-sublevel-item"
let sublevelItemActive = `${sublevelItem} sublevel-item-active`
let menuItem = "silder-menu-item"
let menuItemActive = `${menuItem} menu-item-active`
let menuItemInner = "silder-menu-item-inner"
let menuItemInnerActive = `${menuItemInner} item-inner-active`

class SilderBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 1,
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
                {
                    name: '用户管理',
                    key: 4,
                    flag: false,
                    childer: [
                        {
                            name: '用户管理1',
                            key: 14
                        },
                        {
                            name: '用户管理1',
                            key: 15
                        },
                        {
                            name: '用户管理1',
                            key: 16
                        },
                        {
                            name: '用户管理1',
                            key: 17
                        },
                    ]
                },
                {
                    name: '用户管理2',
                    key: 5,
                    flag: false,
                    childer: [
                        {
                            name: '用户管理1',
                            key: 145
                        },
                        {
                            name: '用户管理1',
                            key: 155
                        },
                        {
                            name: '用户管理1',
                            key: 165
                        },
                        {
                            name: '用户管理1',
                            key: 175
                        },
                    ]
                },
            ]
        }
    }

    changeActiveIndex = (e, val, index, status) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            activeIndex: val,
        })
        if (status) {
            const _list = [...this.state.list]
            this.setState({
                list: _list.map((item, idx) => idx === index ? { ...item, flag: !item.flag } : { ...item, flag: false })
            })
        }
    }

    renderMenuItemText = (name) => {
        return (
            <div className="silder-menu-item-text">
                <SettingOutlined className="menu-item-icon silder-menu-item-icon-left" />
                <div className="silder-menu-item-title">{name}</div>
            </div>
        )
    }

    renderSubMenuItemText = (name, state, flag) => {
        return (
            <div className="silder-sub-menu-item-text">
                <SettingOutlined className="sub-menu-item-icon silder-sub--menu-item-icon-left" />
                <div className="sub-silder-menu-item-title">{name}</div>
                {state ? this.renderIcon(flag) : ''}
            </div>
        )
    }

    renderIcon = (flag) => {
        let classText = "sub-menu-item-icon silder-sub-menu-item-icon-rigrt"
        return (
            flag ? <DownOutlined className={classText} /> : <RightOutlined className={classText} />
        )
    }

    setMenuChildern = (arr) => {
        return arr.filter(i => i.key === this.state.activeIndex).length > 0 ? true : false
    }

    setActiveIndex = (val) => {
        return val === this.state.activeIndex ? true : false
    }

    renderSubMenu = (item, index) => {
        return (
            <div key={item.key}
                onClick={(e) => this.changeActiveIndex(e, item.key, index, true)}
                className={this.setActiveIndex(item.key) || this.setMenuChildern(item.childer) ? `${subMenu} sub-menu-active${!item.flag ? 's' : ''}` : subMenu}>
                <div className={this.setActiveIndex(item.key) || this.setMenuChildern(item.childer) ? subMenuInnerActive : subMenuInner}>
                    <div className="silder-menu-sub-header">
                        {this.renderSubMenuItemText(item.name, true, item.flag)}
                    </div>
                    {
                        item.flag && this.setActiveIndex(item.key) && item.childer || this.setMenuChildern(item.childer) ?
                            (<div className="menu-sublevel-list">
                                {
                                    item.childer.map(elem => {
                                        return (<div key={elem.key} onClick={(e) => this.changeActiveIndex(e, elem.key)}
                                            className={this.setActiveIndex(elem.key) ? sublevelItemActive : sublevelItem}>
                                            <div className="menu-sublevel-item">
                                                {this.renderSubMenuItemText(elem.name, false)}
                                            </div>
                                        </div>)
                                    })
                                }
                            </div>) : ''
                    }
                </div>
            </div>
        )
    }

    
    renderSilderMenuItem = (item) => {
        return (
            <div key={item.key} onClick={(e) => this.changeActiveIndex(e, item.key)} className={this.setActiveIndex(item.key) ? menuItemActive : menuItem}>
                <div className={this.setActiveIndex(item.key) ? menuItemInnerActive : menuItemInner}>
                    {this.renderMenuItemText(item.name)}
                </div>
            </div>
        )
    }



    render() {


        const { list } = this.state
        return (
            <div className="slider-bar-wrapper">
                <div className="silder-bar-header">logo</div>
                <div className="silder-bar-content">
                    <div className="silder-menu-wrapper">
                        <div className="silder-menu">
                            {
                                list.map((item, index) => {
                                    return item.childer?this.renderSubMenu(item, index):this.renderSilderMenuItem(item)
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