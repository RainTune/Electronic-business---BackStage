import React from 'react'
import PageTitle from "rootSrc/components/pageTitle.jsx";
import Category from 'rootSrc/components/productCategory.jsx';

import 'rootSrc/css/productSave.scss';
import User from 'rootSrc/util.jsx';
let user = new User();
class productDetail extends React.Component {
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
        document.title = 'RainTune-productDetail';
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
                this.setState(data,() => {
                    this.refs.richTextBox.innerHTML = this.state.detail
                });
            },(err) => {
                user.errorTips(err || '获取信息失败')
            })
    }

    //提交表单
    static arrayToStr(arr) {
        return arr.map(item => item.uri).join(',');
    }
    render() {
        return (
            (
                <div className='home col-sm-8'>
                    <PageTitle title='商品详情'></PageTitle>
                    <div className="col-sm-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2">商品名称</label>
                                <div className="col-sm-10">
                                    <p>{this.state.name}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">商品描述</label>
                                <div className="col-sm-10">
                                    <p>{this.state.subtitle}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">所属分类</label>
                                <div className="col-sm-10">
                                    <Category
                                        disabled="disabled"
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
                                        <input readOnly type="number" className="form-control" placeholder="请输入商品价格"
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
                                        <input readOnly type="number" className="form-control" placeholder="请输入库存数量"
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
                                                </div>
                                            }) : <p>暂无图片</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">商品详情</label>
                                <div className="col-sm-10" ref="richTextBox">
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
export default productDetail