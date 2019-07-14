import React from 'react'

import NavHead from 'rootSrc/components/NavHead.jsx';
import NavSlide from 'rootSrc/components/NavSlide.jsx'
class Common extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='container'>
                <NavHead></NavHead>
                <NavSlide></NavSlide>
                {this.props.children}
            </div>
        )
    }
}
export default Common