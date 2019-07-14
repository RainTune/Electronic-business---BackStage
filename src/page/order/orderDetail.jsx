import React from 'react'
import PageTitle from "rootSrc/components/pageTitle.jsx";
import TableList from 'rootSrc/components/tableList.jsx';
import User from 'rootSrc/util.jsx';
import {Link} from "react-router-dom";
let user = new User();
class orderDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderNo: this.props.match.params.id,
            detail: {}
        }
    }
    componentDidMount() {
        document.title = 'RainTune-orderDetail';
        this.getProductList();

    }
    getProductList() {
        user.userRequest('/manage/order/detail.do','post',{orderNo: this.state.orderNo})
            .then((response) => {
                let res = response.data;
                let data = res.data;
                this.setState({
                    detail: data
                })
            },(err) => {
                user.errorTips(err || '获取信息失败')
            })
    }
    delivery() {
        user.userRequest('/manage/order/send_goods.do','post',{orderNo: this.state.orderNo})
            .then((response) => {
                let res = response.data;
                if(res.status == 0 ) {
                    user.successTips(res.data || '大爷发货成功')
                }
                else if(res,status === 1){
                    user.errorTips(res.data || '大爷发货失败')
                }
            },(err) => {
                user.errorTips(err)
            })
    }
    render() {
        let tableHead = [
            {name: '商品图片', width: '20%'},
            {name: '商品信息', width: '35%'},
            {name: '售价/元', width: '15%'},
            {name: '数量', width: '15%'},
            {name: '合计/元', width: '15%'},
        ];
        let shipInfo = this.state.detail.shippingVo;
        let tableBody = this.state.detail.orderItemVoList && this.state.detail.orderItemVoList.map((item, index) => {
            return (
                <tr key={index}>
                    <td><img width={'80px'} height={'80px'} src={this.state.detail.imageHost + item.productImage && item.productImage} alt=""/></td>
                    <td>{item.productName}</td>
                    <td>￥{item.currentUnitPrice}</td>
                    <td>{item.quantity}</td>
                    <td>{item.totalPrice}</td>
                </tr>
            )
        });
        return (
            (
                <div className='home col-sm-8'>
                    <PageTitle title='订单详情'></PageTitle>
                    <div className="col-sm-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-2">订单号</label>
                                <div className="col-sm-10">
                                    <p>{this.state.detail.orderNo}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">创建时间</label>
                                <div className="col-sm-10">
                                    <p>{this.state.detail.createTime}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">收件人信息</label>
                                <div className="col-sm-10">
                                    <p>姓名：{shipInfo && shipInfo.receiverName}</p>
                                    <p>手机号：{shipInfo && shipInfo.receiverPhone}</p>
                                    <p>地址：{shipInfo && shipInfo.receiverCity}-
                                        {shipInfo && shipInfo.receiverDistrict}-
                                        {shipInfo && shipInfo.receiverZip}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">订单状态</label>
                                <div className="col-sm-10">
                                    <p>
                                        {this.state.detail.statusDesc}
                                        {
                                            /*下面状态代表已经支付*/
                                            this.state.detail.status == 20 &&
                                                <button className={'btn btn-primary btn-sm'} onClick={() => this.delivery()}>立即发货</button>
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">支付方式</label>
                                <div className="col-sm-10">
                                    <p>{this.state.detail.paymentTypeDesc}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">订单金额</label>
                                <div className="col-sm-10">
                                    <p>￥{this.state.detail.payment}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2">商品列表</label>
                                <div className="col-sm-10">
                                    <TableList tableHead = {tableHead}>
                                        {tableBody}
                                    </TableList>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        )
    }


}
export default orderDetail