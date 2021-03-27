import React, { PureComponent } from 'react';
import { Select } from 'antd'
import requestUrl from "@/http/api/requestUrl"
import { requestData } from "@/http/api/comm"

class Selects extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            optins: [],
            selectValue: '',
        }

    }
    componentDidMount() {
        this.loadData()

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        
        let { name, value } = nextProps
        if (Object.prototype.toString.call(value) === '[object Object]') {
            value = value[name]
        }
        if (value !== prevState.selectValue) {
            return {
                selectValue: value
            }
        }
        return null
    }

    loadData = async () => {
        if (!this.props.url) { return false }
        let query = {
            url: requestUrl[this.props.url],
            data: {}
        }
        const { data: res } = await requestData(query).catch(err => err)
        if (res.resCode !== 0) {
            return
        }
        this.setState({
            optins: res.data.data
        })
    }

    selectChange = (value) => {
        let { name, onChange } = this.props
        this.setState({ selectValue: value })
        onChange({ [name]: value })
    }

    render() {
        let { optins, selectValue } = this.state
        let { label, value } = this.props.labelInValue
        return (
            <Select value={selectValue} onChange={this.selectChange}>
                {
                    optins && optins.map(elem => {
                        return <Select.Option value={elem[value]} key={elem[value]}>{elem[label]}</Select.Option>
                    })
                }
            </Select >
        );
    }
}

export default Selects;