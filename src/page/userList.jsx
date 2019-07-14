import React from 'react'
import PageTitle from 'rootSrc/components/pageTitle.jsx'
import {Link} from "react-router-dom";

import Pagination from 'rootSrc/components/Pagination.jsx';
import Loading from 'rootSrc/components/loading.jsx';
import User from 'rootSrc/util.jsx';
import TableList from 'rootSrc/components/tableList.jsx';
let user = new User();

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            pageSize: 0,
            total: 0,
            list: [],
            loadFlag: true
        }
    }
    componentDidMount() {
        document.title = 'RainTune--UserList';
        this.getUserList()
    }
    getUserList() {
        let data = {
            pageNum: this.state.pageNum
        };
        this.setState({
            loadFlag: true
        },() => {
            user.userRequest('/manage/user/list.do','post',data)
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
    onPageChange(current) {
        this.setState({
            pageNum: current
        },() => {
            this.getUserList();
        })
    }
    render() {
        let tableBody = this.state.list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{new Date(item.createTime).toLocaleString()}</td>
                </tr>
            )
        });
        return (
            <div className='home col-sm-8'>
                <PageTitle title='用户列表'/>
                <div className="row">
                    <div className="col-sm-12">
                        {this.state.loadFlag && <Loading/>}
                        <TableList tableHead={['ID','用户名','邮箱','电话','注册时间']}>
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
export default UserList