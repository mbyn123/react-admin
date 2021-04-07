import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react'
import { upload } from '@/http/api/comm'
class Editors extends Component {
    constructor(props) {
        super(props)
    }
    handleEditorChange = (value) => {
        console.log(value);
        this.props.onChange(value)
    }
    uploadImage = async (query, success, failure) => {
        const { data: res } = await upload(query).catch(err => err)
        console.log(res);
        if (res.resCode !== 0) {
            return failure(res.message) // 失败回调
        }
        success(res.data.url) // 成功回调

    }
    render () {
        const editorObj = {
            height: '500px',
            language: 'zh_CN',
            plugins: 'table lists link image preview code',
            toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor | 
            link image | alignleft aligncenter alignright alignjustify  | 
            numlist bullist outdent indent`,
            relative_urls: false,
            file_picker_types: 'image',
            images_upload_url: 'http',
            image_advtab: true,
            image_uploadtab: true,
            images_upload_handler: (blobInfo, success, failure) => { // 图片上传
                var formData;
                var file = blobInfo.blob();//转化为易于理解的file对象，官方写法
                formData = new FormData();
                formData.append('file', file, file.name);//此处与源文档不一样
                this.uploadImage(formData, success, failure)
            }
        }



        return (
            <Editor
                inline={false}
                selector='editorStateRef'  // 选择器
                apiKey='官网上申请的key值'
                initialValue={''}
                init={{ ...editorObj }}
                onEditorChange={this.handleEditorChange}
            />


        );
    }
}

export default Editors;
