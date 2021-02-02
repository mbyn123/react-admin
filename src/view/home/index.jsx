import React, { Component } from 'react'
import "./style.less"
import SilderBar from '@/components/silderBar'

// const { Header, Content } = Layout;

class Home extends Component {
    render () {
        return (
            <div className="layout-wrapper">
                <SilderBar></SilderBar>
            </div>
        )
    }
}

export default Home