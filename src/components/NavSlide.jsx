import React from 'react'
import 'rootSrc/css/NavSlide.scss';
import {Link} from "react-router-dom";

class NavSlide extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='navSlide col-sm-4'>
                <div className="dropdown">
                    <Link to={'/home'} className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1">
                        <span className='glyphicon glyphicon-home icon'></span>
                        <span>首页</span>
                    </Link>
                </div>
                <div className="dropdown">
                    <a className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1">
                        <span className='glyphicon glyphicon-tree-conifer icon'></span>
                        <span>商品</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link to={'/product'}>商品管理</Link></li>
                        <li><Link to="/productCategory">品类管理</Link></li>
                    </ul>
                </div>
                <div className="dropdown">
                    <a className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1">
                        <span className='glyphicon glyphicon-tree-conifer icon'></span>
                        <span>订单</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link to="/orderList">订单管理</Link></li>
                    </ul>
                </div>
                <div className="dropdown">
                    <a className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1">
                        <span className='glyphicon glyphicon-tree-conifer icon'></span>
                        <span>用户</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link to={'/userList'}>用户管理</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default NavSlide