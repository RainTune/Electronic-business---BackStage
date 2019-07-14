import React from 'react'
import 'rootSrc/css/NavHead.scss';
import {Link,withRouter} from "react-router-dom";
import User from 'rootSrc/util.jsx';

let user = new User;
class NavHead extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: ''
        }
    }
    goLogin() {
        let originUrl = window.location.hash.substring(1);
        /*window.location.href = '#/login?redirect=' + decodeURIComponent(originUrl);*/
        this.props.history.push({
            pathname: "/login",
            query: { redirect: originUrl }
        })

    }
    logOut() {
        user.removeUserInfo();
        user.userRequest('/user/logout.do','post')
            .then((response) => {
                let originUrl = window.location.hash.substring(1);
                this.props.history.push({
                    pathname: '/login',
                    query: { redirect: originUrl }
                })
            })
    }
    componentDidMount() {
        let userName = user.getUserInfo();
        this.setState({
            userName
        })
    }
    render() {
        return (
            <div className='navHead'>
                <div className='headWrapper'>
                    <nav className="navbar navbar-default">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">RainTune</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">

                                <li><a onClick={() => this.goLogin()} className='glyphicon glyphicon-user'>
                                    欢迎您，{this.state.userName !== '' ? this.state.userName : '请先登录'}
                                </a></li>
                                {this.state.userName ?
                                    (<li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button">
                                            <span className="caret"></span></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="javascript:;" onClick={() => this.logOut()}>退出</a></li>
                                        </ul>
                                    </li>) : (<span ></span>)}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}
export default withRouter(NavHead)