import React from 'react';
import 'rootSrc/css/login.scss';
import {Redirect} from 'react-router-dom';
import User from 'rootSrc/util.jsx';

let user = new User();

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            originUrl: ''
        }
    }
    componentWillMount() {
        document.title = 'RainTune--Login';
        this.setState({
            originUrl: this.props.location.query.redirect
        })
    }
    onChangeValue(e) {
        let inputName = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputName] : inputValue
        })
    }
    onSubmit() {

        let u = user.trim(this.state.username),
            p = user.trim(this.state.password);
        if(p === '' || u ==='') {
            alert('用户名或密码不能为空！');
            return ;
        }
        let data = {
            username: u,
            password: p
        };
        /*发送请求*/
        user.userRequest('/manage/user/login.do','post',data)
            .then( response => {
                let res = response.data;
                if(res.status == 1) {
                    user.errorTips(res.msg || '大爷:您的密码输入错误')
                }else if(res.status == 10) {
                    user.errorTips(res.msg || '大爷:用户名不存在')
                }else{
                    user.errorTips('大爷: 恭喜您登录成功')
                    user.storeUserInfo(res.data.username);
                    this.props.history.push({
                        pathname: this.state.originUrl
                    })
                }
            })
    }
    render() {
        return (
            <div className='clearfix login'>
                <div className='panel panel-danger col-sm-4 col-sm-offset-4'>
                    <h3 className='text-center'>欢迎进入登录界面</h3>
                    <div className="form-group">
                        <input type="text" className="form-control" name = 'username' placeholder="请输入用户名"
                               onChange={(e) => {this.onChangeValue(e)}}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name='password' placeholder="请输入密码"
                               onChange={(e) => {this.onChangeValue(e)}}/>
                    </div>
                    <div className="form-group">
                        <button className='btn btn-primary btn-block'
                                onClick={() => {this.onSubmit()}}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login