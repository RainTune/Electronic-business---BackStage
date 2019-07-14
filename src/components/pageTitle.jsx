import React from 'react'
class pageTitle extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <h3>{this.props.title}</h3>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default pageTitle