import React from 'react'
import PageTitle from 'rootSrc/components/pageTitle.jsx'
import {Link} from "react-router-dom";

import User from 'rootSrc/util.jsx';

let user = new User();

class productList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            parentId: 0,
            categoryName: ''
        }
    }
    componentDidMount() {
        document.title = 'RainTune--productCategoryAdd';
        this.getCategory()
    }
    getCategory() {
        let data = {
            categoryId: this.state.parentId
        };
        user.userRequest('/manage/category/get_category.do','post',data)
            .then(response => {
                let res = response.data.data;
                this.setState({
                    categoryList: res
                });
            },err=> {
                user.errorTips(err)
            })

    }
    onValueChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }
    onSubmit() {
        user.userRequest('/manage/category/add_category.do', 'post', {
            parentId: this.state.parentId,
            categoryName: this.state.categoryName
        })
            .then((response => {
                let res = response.data;
                user.successTips(res.msg || '大爷，添加成功')
                this.props.history.push('/productCategory');
            }),() => {
                user.errorTips(err || '大爷，您添加失败')
            })
    }
    render() {

        return (
            <div className='home col-sm-8'>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2">请选择品类</label>
                                <div className="col-sm-5">
                                    <select name="parentId" className='form-control' onChange={e => this.onValueChange(e)}>
                                        <option value="0">商品/</option>
                                        {
                                            this.state.categoryList.map((item, index) => {
                                                return <option value={item.id} key={index}>商品/{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">请输入品类</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" placeholder="请输入品类名称"
                                           name='categoryName' onChange={e => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-5 col-sm-offset-2">
                                    <button className={'btn btn-primary'} onClick={() => {this.onSubmit()}}>确认</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default productList