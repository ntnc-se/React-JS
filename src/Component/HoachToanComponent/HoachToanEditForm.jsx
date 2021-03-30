import React, {Component} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import logo from '../KPIComponent/Image/logo.jpg'
import KPIValueService from "../../Service/KPIValueService";
import {Link} from "react-router-dom";

class HoachToanEditForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            kpi_id: this.props.match.params.kpi_id,
            start_date: this.props.match.params.start_date,
            range_type: this.props.match.params.range_type,
            component_type: this.props.match.params.component_type,
            kpi_component_id: '',
            time_id: '',
            value: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
    }

    onSubmit(e){
        let data = {
            kpi_component_id: this.state.kpi_component_id,
            value: this.state.value,
            time_id: this.state.time_id
        }
        KPIValueService.editData(
            data,
            this.state.kpi_id + "",
            2 + "")
            .then(() => this.props.history.push('/hoachtoan'))
        e.preventDefault();
    }

    onChangeValue(e){
        this.setState({value: e.target.value, message: ''}, function () {
        });
    }

    validate(values){
        let error = {}
        if(values.value == null || !values.value.match("^[0-9]*$")){
            error.value = 'Please enter a number, not special characters !'
        }
        return error
    }

    componentDidMount() {
        KPIValueService.getSpecificData(
            this.state.kpi_id + "",
            this.state.start_date + "",
            this.state.range_type + "",
            2 + "")
            .then(
                response => this.setState(
                    {
                        value: response.data.value,
                        time_id: response.data.time_id,
                        kpi_component_id: response.data.kpi_component_id
                    }
                )
            )
    }

    backToHome(){
        this.props.history.push(`/hoachtoan`)
    }

    render() {
        let { kpi_id, start_date, range_type, value} = this.state
        return(
            <div className="container">
                <div className="menu-side-bar">
                    <div className="image">
                        <Link to = {'/hoachtoan'}>
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
                <h2 className="tab">⮞ Số Chốt</h2>
                <div className="containers-edit">
                    <Formik initialValues={{kpi_id, start_date, value, range_type}}
                            validateOnchange = {true} validateOnBlur = {true}
                            validate = {this.validate} enableReinitialize={true}>
                        {
                            (props) => (
                                <Form onSubmit = {this.onSubmit}
                                      validateOnchange = {true}
                                      validate = {this.validate}>
                                    <fieldset className="form-group-edit">
                                        <label>KPI Category: </label>
                                        <Field disabled className = "form-control-label" type="text" name = "kpi_id"/>
                                    </fieldset>
                                    <ErrorMessage name="value" component="div" className="alert-error" />
                                    <fieldset className="form-group-edit">
                                        <label>Enter New KPI Value: </label><br/>
                                        <Field className = "form-control-edit" type="text" name = "value"
                                               onChange={(e) => this.onChangeValue(e)}  value = {this.state.value}/>
                                    </fieldset>
                                    <button onClick={() => this.backToHome()} className="btn-edit" type="submit">Cancel</button>
                                    <button className="btn-edit" type="submit">Save</button>
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

export default HoachToanEditForm