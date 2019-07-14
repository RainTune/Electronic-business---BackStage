import React from 'react'
import 'rootSrc/css/searchLists.scss'
class searchList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'productId',
            searchKeyword: ''
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
        this.props.onSearch(this.state.searchType, this.state.searchKeyword)
    }
    render() {
        return (
            <div className={'col-sm-12 searchBox'}>
                <div className="form-inline">
                    <div className="form-group">
                        <select name ='searchType' className={'form-control'} onChange={(e) => this.onValueChange(e)}>
                            <option value="productId">按商品ID查询</option>
                            <option value="productName">按商品名称查询</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input name = 'searchKeyword' type="text" className="form-control" placeholder="请输入关键字" onChange={(e) => this.onValueChange(e)}/>
                    </div>
                    <button className="btn btn-primary" onClick = {() => this.onSearch()}>确定</button>
                </div>
            </div>
        )
    }
}
export default searchList