import axios from 'axios';
import qs from 'qs';
class User {
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    userRequest(url,method,data) {
        if(data) {
            data = qs .stringify(data);
        }else {
            data = ''
        }
        return axios({
            method: method || 'get',
            url: url,
            data: data,
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        })
    }
    storeUserInfo(userName) {
        let userInfo = {
            'userName': userName,
            'loginTime': new Date().getTime()
        };
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
    }
    getUserInfo() {
        let userInfo = localStorage.getItem('userInfo');
        /*设置登录保持时间为10分钟*/
        if(!userInfo) {
            return ''
        }
        userInfo = JSON.parse(userInfo);
        let nowTime = new Date().getTime();
        let flag = nowTime - new Date(userInfo.loginTime).getTime() ;
        console.log(flag);
        if( flag > 600000){
            this.removeUserInfo();
            return ''
        }

        return userInfo.userName;
    }
    removeUserInfo() {
        localStorage.removeItem('userInfo');
    }
    errorTips(err) {
        alert(err);
    }
    successTips(tip) {
        alert(tip);
    }
    checkProductList(product) {
        console.log(product);
        if(typeof product.name !== 'string' || product.name.length <= 0) {
            return {
                status: false,
                msg: '商品名不能为空'
            }
        }
        if(typeof product.subtitle !== 'string' || product.subtitle.length <= 0) {
            return {
                status: false,
                msg: '商品描述不能为空'
            }
        }
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
            return {
                status: false,
                msg: '商品品类不能为空'
            }
        }
        if(typeof product.price !== 'number' || !(product.price >= 0)) {
            return {
                status: false,
                msg: '价格不能为空'
            }
        }
        if(typeof product.stock !== 'number' || !(product.stock >= 0)) {
            return {
                status: false,
                msg: '库存不能为空'
            }
        }
        if(typeof product.subImages !== 'string' || product.subImages.length <= 0) {
            return {
                status: false,
                msg: '请上传图片'
            }
        }
        if(typeof product.detail !== 'string' || product.detail.length <= 0) {
            return {
                status: false,
                msg: '详情不能为空'
            }
        }
        return {
            status: true
        }
    }
}
export default User