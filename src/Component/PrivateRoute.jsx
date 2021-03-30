import React from 'react'
import {Route, Redirect} from 'react-router-dom'

let PrivateRoute;
PrivateRoute = (props) => {
    if (sessionStorage.getItem("username") == null || sessionStorage.getItem("username")
        !== sessionStorage.getItem("private_user_name")) {
        return (<Redirect to="/"/>);
    } else {
        return (<Route path={props.path} exact={props.exact} component={props.component}/>)
    }
};

export default PrivateRoute

