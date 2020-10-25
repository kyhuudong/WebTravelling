import React from 'react';
import Loginbygoogle from'./Loginbygoogle';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//Login Box
class LoginBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        id: '',
        password: '',
        error: null,
        customers: []
      };
      this.loginCheck = this.loginCheck.bind();
    }
    

    loginCheck = (e) => {
      var message = document.getElementById('error');
      e.preventDefault();
      const user = {
        id : this.state.id,
        password: this.state.password
      };
      fetch('http://localhost:3001/checkLogin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body : JSON.stringify(user)
      })
      .then(res => res.text())
      .then(result => {
        if(result === null){
          message.innerHTML = "Account don't exist!!!";
        } else {
          var user = JSON.parse(result);
          sessionStorage.setItem("fullname", user.full_name);
          sessionStorage.setItem("userID", user.user_id);
          toast("Login success! Go to homepage", { type: "success" });
          setTimeout(()=>{
            window.location = "/home";
          }, 1500);          
        }
      })
      .catch(error => message.innerHTML = "Error. Please try later!")
    }

    handleIdChange = (e) => {
      this.setState({ id: e.target.value });
    }
  
    handlePasswordChange = (e) => {
      this.setState({ password: e.target.value });
    }

    render() {
      return (
        <div className="inner-container">
          <div className="header">
            Đăng nhập
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"
                autoFocus
                onChange={this.handleIdChange}/>
            </div>
  
            <div className="input-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                onChange={this.handlePasswordChange}/>
            </div>
            <div className="error-group">
              <span htmlFor="error" id="error" className="error"></span>
            </div>
            <button
              type="button"
              className="login-btn margin-t30"
              // onClick={this
              // .submitLogin
              // .bind(this)}
              title="Login"
              onClick={this.loginCheck}>Đăng Nhập</button>
            </div>
            <div>
              <Loginbygoogle/>
                {/* <a href="Loginbygoogle" className="fa fa-google-plus gg" component={Loginbygoogle}></a> */}
            </div>
            <a className="goHome" href="/home">Đăng nhập sau/Login later.</a>
        </div>
      );
    }
  
  }
  export default LoginBox;