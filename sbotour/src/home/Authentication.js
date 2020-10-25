import React from 'react';
import LoginBox from'../authentication/LoginBox';
import RegisterBox from'../authentication/RegisterBox';
import '../sass/_loginSty.scss';
import '../sass/timerSty.scss';

class Authentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  render() {
    return (
      <div className="root-container">
        <div className="select-box-container">
        <div
         className={"controller " + (this.state.isLoginOpen
         ? "selected-controller"
         : "")}
         onClick={this
         .showLoginBox
         .bind(this)}>
         Login
       </div>
       <div
         className={"controller " + (this.state.isRegisterOpen
         ? "selected-controller"
         : "")}
         onClick={this
         .showRegisterBox
         .bind(this)}>
         Register
        </div>
        </div>
        <div className="box-container">
        {this.state.isLoginOpen && <LoginBox/>}
        {this.state.isRegisterOpen && <RegisterBox/>}
        </div>
      </div>
    );
  }
  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }
}

export default Authentication;