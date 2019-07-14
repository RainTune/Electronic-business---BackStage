import React from 'react'
/*import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import 'rootSrc/css/fileUpload.scss'*/
import FileUpload from 'rootSrc/fileload/FileUpload.jsx';

class fileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploads:[]
        }
    }
    componentDidMount() {
    }
    /*
    getUploadParams({file, meta}) {
        const body = new FormData()
        body.append('name', 'upload_file');
        return { url: '/manage/product/upload.do'}
    };

    handleChangeStatus ({ meta }, status){
        console.log(status, meta)
    };

    handleSubmit (files, allFiles) {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    };*/
    render() {
        let options ={
            baseUrl:'/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess: res => {
                this.props.onSuccess(res.data);
            },
            uploadError: err => {
                this.props.onError('上传图片失败')
            }
        }
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload" className="btn btn-primary">请选择图片</button>
            </FileUpload>
        )
    }
}
export default fileUpload
