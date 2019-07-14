import React from 'react'
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css'

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }
    /*onChange(current) {
        this.props.onChange(current)
    }*/
    render() {
        return (
            <div className="col-sm-12">
                <RcPagination {...this.props}/>
            </div>
        )
    }
}
export default Pagination