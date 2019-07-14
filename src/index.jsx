import React from 'react';
import ReactDom from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'rootSrc/css/base.scss';
import {HashRouter as Router, Link, Route, Switch, Redirect} from "react-router-dom";

import Common from 'rootSrc/page/Common.jsx';
import Home from 'rootSrc/page/Home.jsx';
import Login from 'rootSrc/page/login.jsx';
import UserList from 'rootSrc/page/userList.jsx';
import ErrorPage from 'rootSrc/page/ErroPage.jsx';
import ProductRouter from 'rootSrc/page/Product/productRouter.jsx';
import OrderList from 'rootSrc/page/order/orderList.jsx';
import OrderDetail from 'rootSrc/page/order/orderDetail.jsx';
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component = {Login}/>
                    <Route path ='/' render={(props) => {
                        return (<Common>
                            <Switch>
                                <Route path='/home' component = {Home}/>
                                <Route path='/userList' component = {UserList}/>
                                <Route path='/product' component = {ProductRouter}/>
                                <Route path='/productCategory' component = {ProductRouter}/>
                                <Route path='/orderList' component = {OrderList}/>
                                <Route path='/orderDetail/:id' component = {OrderDetail}/>
                                <Redirect exact from='/' to='/home'/>
                                <Route component = {ErrorPage}/>
                            </Switch>
                        </Common>)
                    }}/>
                </Switch>
            </Router>
        )
    }
}
ReactDom.render(
    <App></App>,
    document.getElementById('app')
);