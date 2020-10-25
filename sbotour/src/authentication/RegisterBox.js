//Register Box 
import React from 'react';
class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      id: '',
      password: '',
      confirm_password: '',
      error: null,
      isLoaded: false
    }
  }

  handleFullnameChange = (e) => {
    this.setState({ fullname: e.target.value });
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handleIdChange = (e) => {
    this.setState({ id: e.target.value });
  }

  handlePasswordChange = (e) => {
    document.getElementById('error').innerHTML = "";
    this.setState({ password: e.target.value });
    var password = document.getElementById('password');
    var confirm = document.getElementById('confirm-password');
    if(password.value !== this.state.confirm_password){
      confirm.style.borderColor = 'red';
    } else {
      confirm.style.borderColor = '#70a1ff';
    }
  }

  handleConfirmPasswordChange = (e) => {
    document.getElementById('error').innerHTML = "";
    this.setState({ confirm_password: e.target.value });
    var confirm = document.getElementById('confirm-password');
    if(confirm.value !== this.state.password){
      confirm.style.borderColor = 'red';
    } else {
      confirm.style.borderColor = '#70a1ff';
    }
  }

  doRegister = (e) => {
    var message = document.getElementById('error');
    message.style.color = 'red';
    if(this.state.password !== this.state.confirm_password) {
      message.innerHTML = "Password doesn't match!!!";
      return;
    }
    e.preventDefault();

    const { id, password, email, fullname } = this.state;
      fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id, password, email, fullname })
      })
      .then(response => response.text())
      .then(result => {
        if(result === 'Successfully!!!'){
          message.innerHTML = 'Register successful!!!';
          message.style.color = '#2efc27';
        } else {
          message.innerHTML = 'Register failed: ' + result;
        } 
      })
      .catch(error => message.innerHTML = 'Register failed: ' + error);
  }

  render() {
    
    return (
      <div className="inner-container">
        <div className="header">
          Đăng ký
          </div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="full-name">Họ và tên</label>
            <input 
              type="text" 
              name="text" 
              className="login-input" 
              placeholder="Full name" 
              autoFocus
              value={this.state.fullname} onChange={this.handleFullnameChange} />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              name="email" 
              className="login-input" 
              placeholder="Email" 
              value={this.state.email} onChange={this.handleEmailChange} />
          </div>

          <div className="input-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              value={this.state.id}
              onChange={this.handleIdChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              className="login-input"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm-password"
              className="login-input"
              placeholder="Confirm password"
              value={this.state.confirm_password}
              onChange={this.handleConfirmPasswordChange}
            />
          </div>
          <div className="error-group">
            <label htmlFor="error" id="error" className="error"></label>
          </div>
          <button
            type="button"
            className="login-btn margin-t30"
            title="Register"
            onClick={this.doRegister}>Đăng ký</button>
        </div>
      </div>
    );
  }
}
export default RegisterBox;