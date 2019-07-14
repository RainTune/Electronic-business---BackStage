import React from 'react'
import {Link} from "react-router-dom";

class errorPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='col-sm-8 text-center'>
                <h3><span>出错了!!!</span></h3>
                <div><Link to={'/'} className={'btn btn-primary'}>点我返回首页</Link></div>
            </div>
        )
    }
}
export default errorPage