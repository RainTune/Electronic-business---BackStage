import React from 'react'
import PageTitle from "rootSrc/components/pageTitle.jsx";
import Category from 'rootSrc/components/productCategory.jsx';
import FileUpload from  'rootSrc/components/fileUpload.jsx';
import RichEditor from 'rootSrc/components/richEditor.jsx';
import 'rootSrc/css/productSave.scss';
import User from 'rootSrc/util.jsx';
let user = new User();
class productSave extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            subtitle: '',
            categoryId: '',
            parentCategoryId: '',
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1, /*这是状态标志位，表示在售*/
            id: this.props.match.params.id
        }
    }
    componentDidMount() {
        document.title = 'RainTune-productSave';
        if(this.props.match.params.id) {
            this.getProductList();
        }
    }
    getProductList() {
        user.userRequest('/manage/product/detail.do','post',{productId: this.state.id})
            .then((response) => {
                let res = response.data;
                let data = res.data;
                let subImages = data.subImages.split(',');
                data.subImages = subImages.map((item, i) => {
                    return {
                        uri: item,
                        url: data.imageHost + item
                    }
                });
                this.setState(data);
            },(err) => {
                user.errorTips(err || '获取信息失败')
            })
    }

    //提交表单
    static arrayToStr(arr) {
        return arr.map(item => item.uri).join(',');
    }
    onSubmit() {
        let productList = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            categoryId: parseInt(this.state.categoryId),
            subImages: productSave.arrayToStr(this.state.subImages),
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            detail:this.state.detail,
            status: this.state.status
        };
        /*判断有无id，如果有则是编辑，没有则是添加,具体参加接口api*/
        if(this.state.id) {
            productList.id = this.state.id;
        }
        let res = user.checkProductList(productList);
        if(res.status) {
            user.userRequest('/manage/product/save.do','post',productList)
                .then(response => {
                    let res = response.data;
                    user.successTips(res.data||'大爷，保存成功')
                    this.props.history.push('/product');
                },(err) => {
                    user.errorTips(err || '大爷，保存失败')
                })
        }else {
            user.errorTips(res.msg)
        }
    }
    /*这是普通字段的变化*/
    onValueChange(e) {
        let name = e.target.name;
        let value = e.target.value.trim();
        this.setState({
            [name]: value
        })
    }
    onCategoryChange(childId,parentId) {
        this.setState({
            categoryId: childId,
            parentCategoryId: parentId
        })
    }
    uploadSuccess(data) {
        let subImages = this.state.subImages;
        subImages.push(data);
        this.setState({
            subImages: subImages
        })
    }
    uploadError(err){
        user.errorTips(err);
    }
    onDelImage(e, index) {
        let subImg = this.state.subImages;
        subImg.splice(index,1);
        this.setState({
            subImages: subImg
        })
    }
    onRichEditorChange(val) {
        this.setState({
            detail: val
        })
    }
    render() {
        return (
            (
                <div className='home col-sm-8'>
                    <PageTitle title='添加商品'></PageTitle>
                    <div className="col-sm-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2">商品名称</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="请输入商品名称"
                                           value={this.state.name}
                                            name='name' onChange={e => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">商品描述</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="请输入商品描述"
                                           value={this.state.subtitle}
                                           name='subtitle' onChange={e => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">所属分类</label>
                                <div className="col-sm-10">
                                    <Category
                                        categoryId={this.state.categoryId}
                                        parentCategoryId = {this.state.parentCategoryId}
                                        onCategoryChange = {
                                        (childId, parentId) => this.onCategoryChange(childId,parentId)
                                    }/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">商品价格</label>
                                <div className="col-sm-5">
                                    <div className="input-group">
                                        <input type="number" className="form-control" placeholder="请输入商品价格"
                                               value={this.state.price}
                                               name='price' onChange={e => this.onValueChange(e)}/>
                                        <div className="input-group-addon">元</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">库存</label>
                                <div className="col-sm-5">
                                    <div className="input-group">
                                        <input type="number" className="form-control" placeholder="请输入库存数量"
                                               value={this.state.stock}
                                               name='stock' onChange={e => this.onValueChange(e)}/>
                                        <div className="input-group-addon">件</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">商品图片</label>
                                <div className="col-sm-10">
                                    <div className='clearfix loadZone'>
                                        {
                                            this.state.subImages.length > 0 ? this.state.subImages.map((item,index) => {
                                            return <div className='imgBox' key={index}>
                                                <img src={item.url}/>
                                                <i className='fa fa-window-close' onClick={(e) => this.onDelImage(e,index)}></i>
                                            </div>
                                            }) : <p>暂无图片</p>
                                        }
                                    </div>
                                    <FileUpload
                                        onSuccess={(data) => this.uploadSuccess(data)}
                                        onError={(err) => this.uploadError(err)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">商品详情</label>
                                <div className="col-sm-10">
                                    <RichEditor
                                        detail = {this.state.detail}
                                        onChange={(val) => this.onRichEditorChange(val)}/>
                                </div>
                            </div>
                            <div className="form-group text-center">
                                <span className="btn btn-primary btn-large" onClick={(e) => this.onSubmit(e)}>确定</span>
                            </div>
                        </div>

                    </div>
                </div>
            )
        )
    }
}
export default productSave