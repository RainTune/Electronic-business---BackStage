import React from 'react'
import PageTitle from 'rootSrc/components/pageTitle.jsx'
import {Link} from "react-router-dom";

import Pagination from 'rootSrc/components/Pagination.jsx';
import Loading from 'rootSrc/components/loading.jsx';
import User from 'rootSrc/util.jsx';
import TableList from 'rootSrc/components/tableList.jsx';
import SearchList from 'rootSrc/components/orderSearchList.jsx';
let user = new User();

class orderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            list: [],
            loadFlag: true,
            orderNo: ''
        }
    }
    componentDidMount() {
        document.title = 'RainTune--orderList';
        this.getOrderList()
    }
    getOrderList() {
        let data = {
            pageNum: this.state.pageNum,
        };
        this.setState({
            loadFlag: true
        },() => {
            user.userRequest('/manage/order/list.do','post',data)
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
    onSearch(orderNo) {
        orderNo = orderNo.trim();
        this.setState({
            pageNum: 1,
            loadFlag: true
        },() => {
            if(orderNo === '') {
                this.getOrderList();
            }else {
                user.userRequest('/manage/order/search.do', 'post',{
                    orderNo: orderNo
                }).then(response => {
                    let res = response.data;
                    if(res.status == 1) {
                        user.errorTips(res.msg)
                        this.setState({
                            list: []
                        })
                    }
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
            this.getOrderList();
        })
    }
    render() {
        let tableHead = [
            {name: '订单号', width: '25%'},
            {name: '收件人', width: '15%'},
            {name: '订单状态', width: '15%'},
            {name: '订单总价', width: '15%'},
            {name: '创建时间', width: '20%'},
            {name: '操作', width: '10%'},
        ]
        let tableBody = this.state.list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.orderNo}</td>
                    <td>{item.receiverName}</td>
                    <td>{item.statusDesc}</td>
                    <td>￥{item.payment}</td>
                    <td>{item.createTime}</td>
                    <td>
                        <p><Link className={'btn btn-primary btn-sm'} to={`/orderDetail/${item.orderNo}`}>详情</Link></p>
                    </td>
                </tr>
            )
        });
        return (
            <div className='home col-sm-8'>
                <PageTitle title='订单列表'></PageTitle>
                <SearchList onSearch = {(orderNo) => this.onSearch(orderNo)}/>
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
export default orderList