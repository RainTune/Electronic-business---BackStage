import React from 'react';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import ProductList from 'rootSrc/page/Product/productList.jsx';
import ProductSave from 'rootSrc/page/Product/productSave.jsx';
import ProductDetail from 'rootSrc/page/Product/productDetail.jsx';
import ProductCategory from 'rootSrc/page/Product/productCategory.jsx';
import ProductCategoryAdd from 'rootSrc/page/Product/productCategoryAdd.jsx';
class productRouter extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Switch>
                <Route path='/product/productList' component = {ProductList}></Route>
                <Route path='/product/save/:id?' component = {ProductSave}></Route>
                <Route path='/product/detail/:id' component = {ProductDetail}></Route>
                <Route path='/productCategory/:id?' component = {ProductCategory}></Route>
                <Route path='/product/add' component = {ProductCategoryAdd}></Route>
                <Redirect exact from = '/product' to = '/product/productList'></Redirect>
            </Switch>
        )
    }
}
export default productRouter