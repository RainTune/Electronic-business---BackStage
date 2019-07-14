import React from 'react'
import 'rootSrc/css/searchLists.scss'
class searchList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: ''
        }
    }
    onValueChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }
    onSearch() {
        this.props.onSearch(this.state.orderNo);
    }
    render() {
        return (
            <div className={'col-sm-12 searchBox'}>
                <div className="form-inline">
                    <div className="form-group">
                        <select name ='searchType' className={'form-control'}>
                            <option>按订单号查询</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input name = 'orderNo' type="text" className="form-control" placeholder="请输入订单号" onChange={(e) => this.onValueChange(e)}/>
                    </div>
                    <button className="btn btn-primary" onClick = {() => this.onSearch()}>确定</button>
                </div>
            </div>
        )
    }
}
export default searchList