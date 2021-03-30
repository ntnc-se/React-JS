import React, {Component} from "react";
import {Formik, Form, Field} from "formik";
import logo from "./Image/logo.jpg";
import {Link} from "react-router-dom";
import KPICateService from "../../Service/KPICateService";
import KPIRoomService from "../../Service/KPIRoomService";

class AddKPI extends Component{

    constructor(props) {
        super(props);
        this.state = {
            rooms:[],
            name: '',
            room_id: '',
            unit: '',
            category_id: '',
            desc: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeId = this.onChangeId.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeUnit = this.onChangeUnit.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.loadAllRoomsFromDB = this.loadAllRoomsFromDB.bind(this)
        this.onClickRoom = this.onClickRoom.bind(this)
        this.backToHome = this.backToHome.bind(this)
    }

    componentDidMount() {
        this.loadAllRoomsFromDB()
    }

    loadAllRoomsFromDB(){
        KPIRoomService.getAllRooms()
            .then(
                response => {
                    this.setState({rooms : response.data})
                }
            )
    }

    onClickRoom(e){
        this.setState({room_id: e.target.value, message: ''}, function () {
            sessionStorage.setItem("room_id", this.state.room_id);
        });
    }

    onChangeId(e){
        this.setState({category_id: e.target.value, message: ''}, function () {
        });
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

    onSubmit(e){
        let data = {
            name: this.state.name,
            category_id: this.state.category_id,
            desc: this.state.desc,
            unit: this.state.unit,
            room_id: sessionStorage.getItem("room_id")
        }

        console.log(this.state.name)
        console.log(this.state.category_id)
        console.log(this.state.desc)
        console.log(this.state.unit)
        console.log(sessionStorage.getItem("room_id"))

        KPICateService.insertCategory(data)
            .then(() => this.props.history.push('/listkpi'))
        e.preventDefault();
    }

    backToHome(){
        this.props.history.push(`/listkpi`)
    }

    render() {
        let {id, name, desc, unit, room_id} = this.state
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
                    <h2 className="tab">⮞ Quản lý KPI</h2>

                    <Formik initialValues={{id, name, desc, unit, room_id}}
                            validateOnchange = {true} validateOnBlur = {true}
                             enableReinitialize={true}>
                        {
                            (props) => (
                                <div>
                                    <Form onSubmit = {this.onSubmit}
                                          validateOnchange = {true}>
                                        <label className="label_combobox-add">Room: </label>
                                        <select className="combobox-add" onClick={this.onClickRoom}>
                                            <option disabled selected >Choose the room:</option>
                                            {
                                                this.state.rooms.map((data) =>
                                                    <option value={data.id}>{data.name}</option>
                                                )
                                            }
                                        </select>
                                        <br/>
                                        <fieldset className="form-group-edit">
                                            <label className="title-add">KPI ID:</label><br/>
                                            <Field className = "form-control-edit"
                                                   onChange={(e) => this.onChangeId(e)} value = {this.state.id}
                                                   type="text" name = "start_date" required/>
                                        </fieldset>
                                        <fieldset className="form-group-edit">
                                            <label className="title-add">Name:</label><br/>
                                            <Field className = "form-control-edit"
                                                   onChange={(e) => this.onChangeName(e)}  value = {this.state.name}
                                                   type="text" name = "value" required/>
                                        </fieldset>
                                        <fieldset className="form-group-edit">
                                            <label className="title-add">Unit:</label><br/>
                                            <Field className = "form-control-edit"
                                                   onChange={(e) => this.onChangeUnit(e)}  value = {this.state.unit}
                                                   type="text" name = "value" required/>
                                        </fieldset>
                                        <fieldset className="form-group-edit">
                                            <label className="title-add">Description:</label><br/>
                                            <textarea style={{height: 100}} className = "form-control-edit"
                                                   onChange={(e) => this.onChangeDesc(e)}  value = {this.state.desc}
                                                      type="text" name = "value" required>zzz</textarea>
                                        </fieldset>
                                        <button onClick={() => this.backToHome()} className="btn-addnew" type="submit">Cancel</button>
                                        <button className="btn-addnew" type="submit">Add New</button>
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

export default AddKPI