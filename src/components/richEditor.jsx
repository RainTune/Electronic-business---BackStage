import React from 'react'
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import 'rootSrc/css/richEditor.scss'
import $ from 'jquery';
class richEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: ''
        }
    }
    componentDidMount() {
        this.initEditor()
    }
    componentWillReceiveProps(props) {
        /*判断数据有没有改变*/
        if(props.detail !== this.state.detail) {
            this.editor.setValue(props.detail)
        }

    }
    initEditor() {
        let ele = this.refs['myRichText'];
        this.editor = new Simditor({
            textarea: $(ele),
            placeholder: this.props.placeholder || '请输入内容',
            upload:{
                url: '/manage/product/richtext_img_upload.do',
                params: null,
                fileKey: 'upload_file'
            }
        });
        this.editor.on('valuechanged', (e) =>{
            //.log(editor.getValue());
            let val = this.editor.getValue();
            this.setState({
                detail: val
            },() => {
                this.props.onChange(this.state.detail)
            });

        })
    }
    render() {
        return (
                <textarea ref='myRichText'/>
        )
    }
}
export default richEditor