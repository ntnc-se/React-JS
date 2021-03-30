import React, {Component} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import KPIValueService from "../Service/KPIValueService";
import ComponentService from "../Service/KPIComponentService";
import logo from "./Image/logo.jpg";
import {Link} from "react-router-dom";
import KPICateService from "../Service/KPICateService";

class AddForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            KPI_Category:[],
            kpi_component_id: '',
            kpi_name: '',
            value: '',
            kpi_id: '',
            start_date: '',
            range_type: '',
            time_id: '',
            insert_time: '',
            fileData: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmitFile = this.onSubmitFile.bind(this)
        this.validate = this.validate.bind(this)
        this.onClickComponent = this.onClickComponent.bind(this)
        this.onClickTimeRange = this.onClickTimeRange.bind(this)
        this.onClickStartDate = this.onClickStartDate.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        this._handleFileChange = this._handleFileChange.bind(this)
    }

    componentDidMount() {
        this.loadAllKPI_IDFromDB()
    }

    loadAllKPI_IDFromDB(){
        KPICateService.getAllKPICate(sessionStorage.getItem("room_id") + "")
            .then(
                response => {
                    this.setState({KPI_Category : response.data})
                }
            )
    }

    onClickComponent(e){
        this.setState({kpi_id: e.target.value, message: ''}, function () {
            sessionStorage.setItem("category_id", this.state.kpi_id);
            ComponentService.getKPIComponentId(
                sessionStorage.getItem("category_id") + "" ,
                3 + "")
                .then(
                    response => {
                        this.setState({kpi_component_id : response.data})
                    }
                )
        });
    }

    onClickStartDate(e){
        this.setState({start_date: e.target.value, message: ''}, function () {
        });
    }
    onChangeValue(e){
        this.setState({value: e.target.value, message: ''}, function () {
        });
    }
    onClickTimeRange(e){
        this.setState({range_type: e.target.value, message: ''}, function () {
            ComponentService.getKPIComponentId(
                sessionStorage.getItem("category_id") + "" ,
                3 + "")
                .then(
                    response => {
                        this.setState({kpi_component_id : response.data})
                    }
                )
        });
    }

    onSubmit(e){
        let data = {
            kpi_component_id: this.state.kpi_component_id,
            value: this.state.value,
        }
        KPIValueService.insertData(
            data,
            this.state.start_date + "",
            this.state.range_type + "",
            sessionStorage.getItem("category_id") + "",
            3 + "")
            .then(() => this.props.history.push('/home'))
        e.preventDefault();
    }

    onSubmitFile(e){
        e.preventDefault();
        let url = `http://localhost:9091/api/upload`;
        let formData = new FormData()
        formData.append('file', this.state.fileData[0]);
        fetch(url, {
            method: 'post',
            headers: {
                'start_date' : this.state.start_date,
                'range_type' : this.state.range_type,
                'component_type' : 3
            },
            body: formData
        }).then(r => this.props.history.push('/home'));
    }

    validate(values){
        let error = {}
        if(values.value == null || !values.value.match("^[0-9]*$")){
            error.value = 'Please enter a number, not special characters !'
        }
        return error
    }

    backToHome(){
        this.props.history.push(`/home`)
    }

    _handleFileChange(e){
        this.setState({fileData: e.target.files})
        if (e.target.files && e.target.files[0]) {
        }
        e.preventDefault();
    }

    render() {
        let {time_id, value, kpi_component_id} = this.state
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
                    <h3>Create Form</h3>
                    <h2 className="tab">⮞ Số Kế Hoạch</h2>
                <Formik initialValues={{kpi_component_id, value, time_id}}
                        validateOnchange = {true} validateOnBlur = {true}
                        validate = {this.validate} enableReinitialize={true}>
                    {
                        (props) => (
                            <div>
                            <Form onSubmit = {this.onSubmit}
                                  validateOnchange = {true}
                                  validate = {this.validate}>
                                <label className="label_combobox-add">Category:</label>
                                <select className="combobox-add" onClick={this.onClickComponent}>
                                    <option disabled selected value={sessionStorage.getItem("category_id")}>
                                        {sessionStorage.getItem("category_id")}</option>
                                    {
                                        this.state.KPI_Category.map((data) =>
                                            <option value={data.category_id}>{data.name}</option>
                                        )
                                    }
                                </select>
                                <br/>
                                <label className="label_combobox-add">Time Range:</label>
                                <select className="combobox-add" onChange={(e) => this.onClickTimeRange(e)} required>
                                    <option value="" disabled selected>Choose the time range</option>
                                    <option value="1">1-Daily</option>
                                    <option value="2">2-Weekly</option>
                                    <option value="3">3-Monthly</option>
                                    <option value="4">4-Quarterly</option>
                                    <option value="5">5-Annually</option>
                                </select>
                                <fieldset className="form-group-edit">
                                    <label className="title-add">Start Date:</label><br/>
                                    <Field className = "form-control-edit" placeholder="Enter time format yyyy-mm-dd"
                                           onChange={this.onClickStartDate}  value = {this.state.start_date}
                                           type="date" name = "start_date" required/>
                                </fieldset>
                                <ErrorMessage name="value" component="div" className="alert-error" />
                                <fieldset className="form-group-edit">
                                    <label className="title-add">Value:</label><br/>
                                    <Field className = "form-control-edit" placeholder="Enter an exactly floating number"
                                           onChange={(e) => this.onChangeValue(e)}  value = {this.state.value}
                                           type="text" name = "value" required/>
                                </fieldset>
                                <button onClick={() => this.backToHome()} className="btn-addnew" type="submit">Cancel</button>
                                <button className="btn-addnew" type="submit">Add New</button>
                            </Form>
                            <Form className="form-file" onSubmit = {this.onSubmitFile} enctype="multipart/form-data">
                                <fieldset className="form-group-edit">
                                    <label className="title-add">Choose file to upload: </label><br/><br/>
                                    <input type="file" className="file" onChange={(e )=>this._handleFileChange(e)}/>
                                </fieldset>
                                <button className="btn-submit" type="submit">Submit File</button>
                            </Form>
                            </div>
                        )
                    }
                </Formik>
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

export default AddForm