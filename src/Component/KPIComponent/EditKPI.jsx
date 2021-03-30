import React, {Component} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import logo from "./Image/logo.jpg";
import {Link} from "react-router-dom";
import KPICateService from "../../Service/KPICateService";

class EditKPI extends Component{

    constructor(props) {
        super(props);
        this.state = {
            category_id: this.props.match.params.category_id,
            name: '',
            room_id: '',
            unit: '',
            desc: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeUnit = this.onChangeUnit.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
    }

    onSubmit(e){
        let data = {
            category_id: this.state.category_id,
            name: this.state.name,
            room_id: sessionStorage.getItem("room_id"),
            unit: this.state.unit,
            desc: this.state.desc
        }
        console.log(this.state.category_id)
        console.log(this.state.name)
        console.log(this.state.unit)
        console.log(this.state.desc)
        KPICateService.updateCategory(data)
            .then(() => this.props.history.push('/listkpi'))
        e.preventDefault();
    }

    onChangeName(e){
        this.setState({name: e.target.value, message: ''}, function () {
        });
    }
    onChangeUnit(e){
        this.setState({unit: e.target.value, message: ''}, function () {
        });
    }
    onChangeDesc(e){
        this.setState({desc: e.target.value, message: ''}, function () {
        });
    }

    componentDidMount() {
        KPICateService.getSpecificCateById(
            this.state.category_id + "")
            .then(
                response => this.setState(
                    {
                        name: response.data.name,
                        unit: response.data.unit,
                        desc: response.data.desc
                    }
                )
            )
    }

    backToHome(){
        this.props.history.push(`/listkpi`)
    }

    render() {
        let { category_id, name, unit, desc} = this.state
        return(
            <div className="container">
                <div className="menu-side-bar">
                    <div className="image">
                        <Link to = {'/home'}>
                            <img src={logo} className="App-logo-custom" alt="logo" />
                        </Link>
                    </div>
                    <Link to={'/home'}>
                        <a className="navbar-side">▷ Quản lý kế hoạch</a>
                    </Link>
                    <Link to={'/hoachtoan'}>
                        <a className="navbar-side">▷ Quản lý hoạch toán</a>
                    </Link>
                    <Link to={'/listkpi'}>
                        <a className="navbar-side">▷ Quản lý KPI</a>
                    </Link>
                </div>
                <div className="content">
                    <h3>Edit Data</h3>
                    <h2 className="tab">⮞ Quản lý KPI</h2>
                    <div className="containers-edit">
                        <Formik initialValues={{category_id, name, unit, desc}}
                                validateOnchange = {true} validateOnBlur = {true}
                                enableReinitialize={true}>
                            {
                                (props) => (
                                    <Form onSubmit = {this.onSubmit}
                                          validateOnchange = {true}>
                                        <fieldset className="form-group-edit">
                                            <label>KPI ID: </label>
                                            <Field disabled className = "form-control-label" type="text" name = "category_id"/>
                                        </fieldset>
                                        <fieldset className="form-group-edit">
                                            <label>KPI Name: </label><br/>
                                            <Field className = "form-control-edit" type="text" name = "name"
                                                   onChange={(e) => this.onChangeName(e)}  value = {this.state.name}/>
                                        </fieldset>
                                        <fieldset className="form-group-edit">
                                            <label>Unit: </label><br/>
                                            <Field className = "form-control-edit" type="text" name = "unit"
                                                   onChange={(e) => this.onChangeUnit(e)}  value = {this.state.unit}/>
                                        </fieldset>
                                        <fieldset className="form-group-edit">
                                            <label>Description: </label><br/>
                                            <textarea style={{height: 150}} className = "form-control-edit" type="text" name = "desc"
                                                   onChange={(e) => this.onChangeDesc(e)}  value = {this.state.desc}>zzz</textarea>
                                        </fieldset>
                                        <button onClick={() => this.backToHome()} className="btn-edit" type="submit">Cancel</button>
                                        <button className="btn-edit" type="submit">Confirm</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                    <div className="footer">
                        Viettel Media, Inc.<br/><br/>
                        + Address: 4th Floor The Light Tower - To Huu Street – Trung Van – Nam Tu Liem – Ha Noi <br/>
                        + Tel: 024 6281 8818 <br/>
                        + Copyright © 2021, Viettel Group
                    </div>
                </div>
            </div>
        )
    }

}

export default EditKPI