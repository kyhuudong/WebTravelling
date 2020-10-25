import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

export class Loginbygoogle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // this.signup = this
        //   .signup
        //   .bind(this);
    }

    // signup(res) {
    //     const googleresponse = {
    //         Name: res.profileObj.name,
    //         email: res.profileObj.email,
    //         token: res.googleId,
    //         Image: res.profileObj.imageUrl,
    //         ProviderId: 'Google'
    //     };
    //     debugger;
    //     axios.post('https://localhost:44392/Api/Login/SocialmediaData', googleresponse)
    //     .then((result) => {
    //         let responseJson = result;
    //         sessionStorage.setItem("userData", JSON.stringify(result));
    //         this.props.history.push('/home')
    //     })
    //     .catch(error => alert('Error when login with your account: ', error));
    // };


    signup(res) {

        const googleresponse = {
            name: res.profileObj.name,
            email: res.profileObj.email,
            token: res.googleId,
            userimage: res.profileObj.imageUrl,
            //providerId: 'Google'
        };
        axios.post('http://localhost:3001/googleusers', googleresponse)
        .then((result) => {
            var user = JSON.stringify(result);
            sessionStorage.setItem("userID", user.user_id);
            sessionStorage.setItem("fullname", googleresponse.name);
            window.location = "/home";
        })
        .catch(error => alert('Error when login with your account: ', error));
    };


    responseGoogle = (res) => {
        this.signup(res);
    }
    
    render() {
        return (
            <div className="App">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4 div-login-google">
                            <GoogleLogin
                                clientId="985161569131-1vm8tfq94tr0lb4lso278112ljdlprqr.apps.googleusercontent.com"
                                buttonText="Login"
                                className="login-google-btn"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                >
                            </GoogleLogin>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loginbygoogle;