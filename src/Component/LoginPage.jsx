import React, {Component} from "react";
import {Field, Form, Formik} from "formik";
import UserAuthService from "../Service/KPIUserAuthService";
import logo from "./Image/logo.jpg";

class LoginPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values){
        sessionStorage.setItem("numrecord", 10 + "");
        sessionStorage.setItem("pagecurrent", 1 + "");
        let username = values.username
        UserAuthService.confirmLogin(values).then( dataCheck => {
            let isUser = dataCheck.data;
            if(isUser === true) {
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("private_user_name", username);
                this.props.history.push('/home')
            }else{
                this.setState({message: `Login fail, check username and password again !` })
                this.props.history.push('/')
            }
            return isUser
        });
    }

    render() {
        let { username, password } = this.state;
        return(
            <div className="login-form">
                <div className="image-login">
                    <img src={logo} className="App-logo-custom" alt="logo" />
                </div>
                <h3>Member Login</h3>
                {this.state.message && <div class="alert-warning-login">{this.state.message}</div>}
                <Formik initialValues={{username, password}}
                        onSubmit= {this.onSubmit}
                        validateOnchange = {false}
                        validateOnBlur = {false}
                        enableReinitialize={true}>
                    {
                        (props) => (
                            <Form className="form-login">
                                <fieldset className="form-group-login">
                                    <label>Username</label>
                                    <Field className = "form-control-login" type="text" placeholder="Enter Username" required name = "username" />
                                </fieldset>
                                <fieldset className="form-group-login">
                                    <label>Password</label>
                                    <Field className = "form-control-login" type="password" placeholder="Enter Password" required name = "password" />
                                </fieldset>
                                <button className="btn-success-login" type="submit">Login</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }

}

export default LoginPage