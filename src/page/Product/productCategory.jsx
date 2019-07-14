import React from 'react'
import PageTitle from 'rootSrc/components/pageTitle.jsx'
import Pagination from 'rootSrc/components/Pagination.jsx';
import Loading from 'rootSrc/components/loading.jsx';
import User from 'rootSrc/util.jsx';
import TableList from 'rootSrc/components/tableList.jsx';
import {Link} from "react-router-dom";

let user = new User();

class ProductCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            list: [],
            loadFlag: true,
            parentCategoryId: this.props.match.params.id || 0,
            allList: [],
            start: 0
        }
    }
    componentDidMount() {
        document.title = 'RainTune--ProductCategory';
        this.getCategory()
    }
    componentDidUpdate(preProps, prevState) {
        let oldPath = preProps.location.pathname,
            newPath = this.props.location.pathname;
        if(newPath !== oldPath) {
            let newId = this.props.match.params.id || 0;
            this.setState({
                parentCategoryId: newId
            },() => {
                this.getCategory()
            })
        }
    }
    getCategory() {
        let data = {
            categoryId: this.state.parentCategoryId
        };
        this.setState({
            loadFlag: true
        },() => {
            user.userRequest('/manage/category/get_category.do','post',data)
                .then(response => {
                    let res = response.data.data;
                    let list = res && res.splice(0,this.state.pageSize);
                    this.setState({
                        pageNum: 1,
                        start: 0,
                        allList: res,
                        list: list
                    }, () => {
                        this.setState({
                            loadFlag : false
                        });
                    });
                },err=> {
                    user.errorTips(err)
                })
        })

    }
    onUpdateCategoryName(id,name) {
        let newName = window.prompt('您确认要修改名字吗',name);
        if(newName) {
            user.userRequest('/manage/category/set_category_name.do', 'post', {
                categoryId: id,
                categoryName: newName
            }).then((response) => {
                let res = response.data;
                user.successTips(res.data || '更改成功');
                this.getCategory();
            },() => {
                user.successTips('更新失败')
            })
        }

    }
    onPageChange(current) {
        let start = (current - 1) * this.state.pageSize;
        let newList  = this.state.allList.splice(start, this.state.pageSize);
        // 1: list = allList.splice(0,pageSize)
        // 2 : list = allList.splice(current-1)
        this.setState({
            start: start,
            pageNum: current,
            list: newList
        });
    }
    render() {
        let start = this.state.start;
        let tableBody = this.state.list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{start ++}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        <a href="javascript:;"
                           className='btn btn-warning'
                           onClick = {() => {this.onUpdateCategoryName(item.id, item.name)}}>
                            修改名称
                        </a>
                        {
                            item.parentId === 0 &&
                            (
                                <Link to = {"/productCategory/" + item.id} className='btn btn-primary'>
                                    查看子品类
                                </Link>
                            )
                        }
                    </td>
                </tr>
            )
        });
        return (
            <div className='home col-sm-8'>
                <PageTitle title='品类列表'>
                    <div style={{position: 'absolute', right:'5px',top: '12px'}}>
                        <Link to={'/product/add'} className={'btn btn-primary'}>
                            <i className={'fa fa-plus'}></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-sm-12">
                        {this.state.loadFlag && <Loading/>}
                        <p>父品类ID: {this.state.parentCategoryId}</p>
                        <TableList tableHead={['序号','ID','品类名称','操作']}>
                            {tableBody}
                        </TableList>
                    </div>
                    <Pagination
                        showQuickJumper={{ goButton: <button>确定</button> }}
                        pageSize={this.state.pageSize}
                        current={this.state.pageNum}
                        onChange={(current) => this.onPageChange(current)}
                        total={this.state.allList.length}
                        showTotal={total => `总共 ${total} 条`}
                    />
                </div>
            </div>
        )
    }
}
export default ProductCategory