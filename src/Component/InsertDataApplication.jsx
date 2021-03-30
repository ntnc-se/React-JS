import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";
import EditForm from "./EditForm";
import AddForm from "./AddForm";
import HoachToanHomePage from "./HoachToanComponent/HoachToanHomePage";
import HoachToanEditForm from "./HoachToanComponent/HoachToanEditForm";
import HoachToanAddForm from "./HoachToanComponent/HoachToanAddForm";
import ListKPI from "./KPIComponent/ListKPI";
import EditKPI from "./KPIComponent/EditKPI";
import AddKPI from "./KPIComponent/AddKPI";

class InsertDataApplication extends Component{

    render() {
        return(
            <Router>
                <>
                    <Switch>
                        <Route path ="/" exact component = {LoginPage}/>
                        <PrivateRoute path = "/home" exact component = {HomePage}/>
                        <PrivateRoute path = "/kpivalues/:kpi_id/:start_date/:range_type/:component_type" component = {EditForm}/>
                        <PrivateRoute path = "/kpivalues/add" component = {AddForm}/>
                        <PrivateRoute path = "/hoachtoan" exact component = {HoachToanHomePage}/>
                        <PrivateRoute path = "/hoachtoanedit/:kpi_id/:start_date/:range_type/:component_type" component = {HoachToanEditForm}/>
                        <PrivateRoute path = "/hoachtoan/add" component = {HoachToanAddForm}/>
                        <PrivateRoute path = "/listkpi" exact component = {ListKPI}/>
                        <PrivateRoute path = "/kpiedit/:category_id" component = {EditKPI}/>
                        <PrivateRoute path = "/listkpi/add" component = {AddKPI}/>
                    </Switch>
                </>
            </Router>
        )
    }

}

export default InsertDataApplication