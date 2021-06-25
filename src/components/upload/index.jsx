import React, { Component } from 'react';
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadToken } from '@/http/api/comm'

class UploadFile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            imageUrl: '',
            uploadKey: {
                token: '',
                key: ''
            }
        }
    }

    componentDidMount () {
        this.getUploadToken()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let { value } = nextProps
        if (value !== prevState.selectValue) { // 获取父组件的传值，比较是否改变
            return { 
                imageUrl: value
            }
        }
        return null
    }


    // 获取七牛云Token
    getUploadToken = async () => {
        const { data: res } = await uploadToken({
            ak: 'sU55f8yyVp4s0DCWvIJoErDHAKKHGKU0ZX1rN7G2',
            sk: 'ufMv_F9zqJNXmLojYPVvtKEZ3DCTtIR1gBCJ2iFQ',
            buckety: 'multipart'
        }).catch(err => err)
        if (res.resCode !== 0) {
            return message.error(res.message)
        }
        this.setState({
            uploadKey: { token: res.data.token }
        })
    }

    // 图片转Base64
    // getBase64 = (img, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }

    beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('图片格式错误!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过2M!');
        }
        // 解析文件
        this.setState({
            uploadKey: { ...this.state.uploadKey, key: encodeURI(`${file.name}`) }
        })
        return isJpgOrPng && isLt2M;
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file);
            // this.getBase64(info.file.originFileObj, imageUrl =>
            //     this.setState({
            //         imageUrl,
            //         loading: false,
            //     }, () => {
            //         let { name, onChange } = this.props
            //         onChange({ [name]: imageUrl })
            //     }),
            // );
            let imageUrl = `http://qqo3qjqcp.hn-bkt.clouddn.com/${info.file.response.key}`
            this.setState({
                imageUrl, loading: false
            }, () => {
                let { onChange } = this.props
                onChange(imageUrl)
            })



        }
    };


    render () {
        const { loading, imageUrl, uploadKey } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://up-z2.qiniup.com"
                data={uploadKey}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100px', height: '100px' }} /> : uploadButton}
            </Upload>
        );
    }
}

export default UploadFile
