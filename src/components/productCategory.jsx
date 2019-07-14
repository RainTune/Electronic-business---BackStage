import React from 'react'
import 'rootSrc/css/productCategory.scss'
import User from 'rootSrc/util.jsx';
let user = new User();
class productCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstCategoryList: [],
            secondCategoryList: [],
            firstCategoryId: 0,
            secondCategoryId: 0
        }
    }
    componentDidMount() {
        this.getFirstCategoryList();
    }
    /*如果是编辑页面，设置初始值*/
    componentWillReceiveProps(props) {
        /*判断数据有无改变*/
        let firstFlag = props.categoryId !== this.state.firstCategoryId,
            secondFlag = props.parentCategoryId !== this.state.secondCategoryId ;
        /*如果没有改变,不做处理*/
        if(!firstFlag && ! secondFlag) {
            return;
        }
        /*如果只有一级分类*/
        if(props.parentCategoryId === 0){
            this.setState ({
                firstCategoryId: props.categoryId,
                secondCategoryId: 0
            })
        }else {
            this.setState ({
                firstCategoryId: props.parentCategoryId,
                secondCategoryId: props.categoryId
            }, () => {
                /*因为一级分类在组件挂载的时候都已经加载了*/
                this.getSecondCategoryList()
            })
        }

    }
    getFirstCategoryList() {
        user.userRequest('/manage/category/get_category.do','post',{
            categoryId: 0
        })
            .then(response => {
                let res = response.data;
                this.setState ({
                    firstCategoryList: res.data
                })
            }, err => {
                user.errorTips(err);
            })
    }
    getSecondCategoryList(firstId) {
        user.userRequest('/manage/category/get_category.do','post',{
            categoryId: firstId
        })
            .then(response => {
                let res = response.data;
                this.setState ({
                    secondCategoryList: res.data
                });
            }, err => {
                user.errorTips(err);
            })
    }
    onFirstCategoryChanged(e) {
        let newVal = e.target.value;
        this.setState({
            firstCategoryId: newVal,
            secondCategoryList: [],
            secondCategoryId:0
        },() => {
            this.getSecondCategoryList(this.state.firstCategoryId);
            this.onCategoryChange()
        })
    }
    onSecondCategoryChanged(e){
        let newVal = e.target.value;
        this.setState({
            secondCategoryId: newVal,
        },() => {
            this.onCategoryChange();
        })
    }
    /*传递给父组件*/
    onCategoryChange(){
        /*判断父组件传递过来的参数是否为函数*/
        let flag = typeof this.props.onCategoryChange === 'function'
        if(this.state.secondCategoryId) {
            flag && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
        }else {
            flag && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }
    render() {
        return (
            <div className='categoryBox'>
                    <select className='form-control'
                            disabled={this.props.disabled}
                            value={this.state.firstCategoryId}
                            onChange={(e) => this.onFirstCategoryChanged(e)}>
                        <option value="">请输入一级品类</option>
                        {
                            this.state.firstCategoryList.map((item, index) => {
                                return <option value={item.id} key={index}>{item.name}</option>
                            })
                        }
                    </select>
                    {
                        this.state.secondCategoryList.length > 0 && (
                            <select className='form-control'
                                    disabled={this.props.disabled}
                                    value={this.state.secondCategoryId}
                                    onChange={(e) => this.onSecondCategoryChanged(e)}>
                                <option value="">请输入二级品类</option>
                                {
                                    this.state.secondCategoryList.map((item, index) => {
                                        return <option value={item.id} key={index}>{item.name}</option>
                                    })
                                }
                            </select>
                        )
                    }
            </div>
        )
    }
}
export default productCategory