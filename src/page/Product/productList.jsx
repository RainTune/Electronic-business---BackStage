import React from 'react'
import PageTitle from 'rootSrc/components/pageTitle.jsx'
import {Link} from "react-router-dom";

import Pagination from 'rootSrc/components/Pagination.jsx';
import Loading from 'rootSrc/components/loading.jsx';
import User from 'rootSrc/util.jsx';
import TableList from 'rootSrc/components/tableList.jsx';
import SearchList from 'rootSrc/components/searchList.jsx';
let user = new User();

class productList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            list: [],
            loadFlag: true
        }
    }
    componentDidMount() {
        document.title = 'RainTune--productList';
        this.getproductList()
    }
    getproductList() {
        let data = {
            pageNum: this.state.pageNum,
        };
        this.setState({
            loadFlag: true
        },() => {
            user.userRequest('/manage/product/list.do','post',data)
                .then(response => {
                    let res = response.data;
                    this.setState(res.data, () => {
                        this.setState({
                            loadFlag : false
                        })
                    });
                },err=> {
                    user.errorTips(err)
                })
        })

    }
    onSetProductStatus(e, id, status) {
        let   comfirmTips = status == 1 ? '您确认要下架此商品吗？' : '您确认要上架此商品吗？';
        if(window.confirm(comfirmTips)) {
            let newStatus = status == 1 ? 2 : 1;
            user.userRequest('/manage/product/set_sale_status.do', 'post', {productId: id, status: newStatus})
                .then((response) => {
                    let res = response.data;
                    user.successTips(res.data || '大爷，更新成功');
                    this.getproductList();
                },(response) => {
                    let res = response.data;
                    user.errorTips(res.data || '大爷，更新失败')
                })
        }
    }
    onSearch(searchType, searchkeyword) {
        searchkeyword = searchkeyword.trim();
        this.setState({
            pageNum: 1,
            loadFlag: true
        },() => {
            if(searchkeyword === '') {
                this.getproductList();
            }else {
                user.userRequest('/manage/product/search.do', 'post',{
                    pageNum: this.state.pageNum,
                    [searchType] : searchkeyword
                }).then(response => {
                    let res = response.data;
                    this.setState(res.data, () => {
                        this.setState({
                            loadFlag : false
                        })
                    });
                },err=> {
                    user.errorTips(err)
                })
            }

        });

    }
    onPageChange(current) {
        this.setState({
            pageNum: current
        },() => {
            this.getproductList();
        })
    }
    render() {
        let tableHead = [
            {name: '产品ID', width: '10%'},
            {name: '产品信息', width: '50%'},
            {name: '售价/元', width: '10%'},
            {name: '产品ID', width: '15%'},
            {name: '产品ID', width: '15%'},
        ]
        let tableBody = this.state.list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                        <p>{item.name}</p>
                        <p>{item.subtitle}</p>
                    </td>
                    <td>￥{item.price}</td>
                    <td>
                        <p>{item.status == 1 ? '在售' : '已下架'}</p>
                        <button className={'btn btn-warning btn-xs'}
                                onClick={(e) => {this.onSetProductStatus(e, item.id, item.status)}}>
                            {item.status == 1 ? '下架' : '上架'}
                        </button>
                    </td>
                    <td>
                        <p><Link className={'btn btn-primary btn-sm'} to={`/product/detail/${item.id}`}>详情</Link></p>
                        <p><Link className={'btn btn-warning btn-sm'}to={`/product/save/${item.id}`}>编辑</Link></p>
                    </td>
                </tr>
            )
        });
        return (
            <div className='home col-sm-8'>
                <PageTitle title='商品列表'>
                    <div style={{position: 'absolute', right:'5px',top: '12px'}}>
                        <Link to={'/product/save'} className={'btn btn-primary'}>
                            <i className={'fa fa-plus'}></i>
                            <span>添加</span>
                        </Link>
                    </div>
                </PageTitle>
                <SearchList onSearch = {(searchType, searchkeyword) => this.onSearch(searchType, searchkeyword)}/>
                <div className="row">
                    <div className="col-sm-12">
                        {this.state.loadFlag && <Loading/>}
                        <TableList tableHead={tableHead}>
                            {tableBody}
                        </TableList>
                    </div>
                    <Pagination
                        showQuickJumper={{ goButton: <button>确定</button> }}
                        pageSize={this.state.pageSize}
                        current={this.state.pageNum}
                        onChange={(current) => this.onPageChange(current)}
                        total={this.state.total}
                        showTotal={total => `总共 ${total} 条`}
                    />
                </div>
            </div>
        )
    }
}
export default productList