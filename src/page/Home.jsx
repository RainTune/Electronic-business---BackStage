import React from 'react'
import 'rootSrc/css/Home.scss'
import PageTitle from 'rootSrc/components/pageTitle.jsx'
import 'font-awesome/css/font-awesome.min.css';
import {Link} from "react-router-dom";

import User from 'rootSrc/util.jsx';

let user = new User();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount : '--',
            productCount: '--',
            orderCount: '--'
        }
    }
    componentDidMount() {
        document.title = 'RainTune--Home';
        this.getHomeInfo();
    }
    getHomeInfo() {
        user.userRequest('/manage/statistic/base_count.do')
            .then(response => {
                let res = response.data;
                this.setState(res.data);
            },(err) => {
                user.errorTips(err);
            })
    }
    render() {
        return (
            <div className='home col-sm-8'>
                <PageTitle title='首页'></PageTitle>
                <div className='row'>
                    <div className='col-sm-4'>
                        <Link to='/userList' className='box box-user'>
                            <h3>{this.state.userCount}</h3>
                            <p>
                                <i className='fa fa-user-o'></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className='col-sm-4'>
                        <Link to='/product' className='box box-product'>
                            <h3>{this.state.productCount}</h3>
                            <p>
                                <i className='fa fa-list-ol'></i>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className='col-sm-4'>
                        <Link to='/orderList' className='box box-order'>
                            <h3>{this.state.orderCount}</h3>
                            <p>
                                <i className='fa fa-check-square-o'></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home