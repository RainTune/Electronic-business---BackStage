import React from 'react'
import {Link} from "react-router-dom";

import Loading from 'rootSrc/components/loading.jsx';

class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        let tableHead = this.props.tableHead.map((item,index) => {
            if(typeof item === 'object'){
                return <th key={index} width={item.width}>{item.name}</th>
            }else if(typeof item === 'string') {
                return <th key={index}>{item}</th>
            }
        });
        let tableBody = this.props.children;
        return (
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>{tableHead}</tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>)
    }
}
export default TableList