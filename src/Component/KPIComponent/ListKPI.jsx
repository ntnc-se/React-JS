import React, {Component} from "react";
import {Link} from "react-router-dom";
import KPIRoomService from "../../Service/KPIRoomService";
import logo from '../KPIComponent/Image/logo.jpg'
import KPICateService from "../../Service/KPICateService";
import {Field, Form, Formik} from "formik";

class ListKPI extends Component{

    constructor(props) {
        super(props);
        this.state ={
            rooms: [],
            KPICate:[],
            room_id: '',
            Message: null,
            component_type: '',
            category_id: ''
        }
        this.logout = this.logout.bind(this)
        this.onClickRoom = this.onClickRoom.bind(this)
        this.loadAllRoomsFromDB = this.loadAllRoomsFromDB.bind(this)
        this.updateDataClicked = this.updateDataClicked.bind(this)
        this.deleteDataClicked = this.deleteDataClicked.bind(this)
        this.insertDataClicked = this.insertDataClicked.bind(this)
        this.loadDefaultDataToTable = this.loadDefaultDataToTable.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onClickID = this.onClickID.bind(this)
    }

    logout(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("room_id");
        sessionStorage.removeItem("category_id");
        sessionStorage.removeItem("private_user_name");
        sessionStorage.removeItem("numrecord");
        sessionStorage.removeItem("pagecurrent");
        this.props.history.push(`/`)
    }

    componentWillMount()
    {
        let username = sessionStorage.getItem("username");
        this.setState({username: username})
    }

    componentDidMount() {
        this.loadAllRoomsFromDB()
        this.loadDefaultDataToTable()
    }

    loadDefaultDataToTable(){
        KPICateService.getAllKPICate(sessionStorage.getItem("room_id") + "")
            .then(
                response => {
                    this.setState({KPICate : response.data})
                }
            )
    }

    loadAllRoomsFromDB(){
        KPIRoomService.getAllRooms()
            .then(
                response => {
                    this.setState({rooms : response.data})
                }
            )
    }

    onClickID(e){
        this.setState({category_id: e.target.value, message: ''}, function () {
        });
    }

    onSearch(e){
        KPICateService.getListSpecificCateById(
            this.state.category_id + "")
            .then(
                response => {
                    this.setState({KPICate : response.data})
                }
            )
        console.log(this.state.category_id)
    }
    onClickRoom(e){
        this.setState({room_id: e.target.value, message: ''}, function () {
            sessionStorage.setItem("room_id", this.state.room_id);
            KPICateService.getAllKPICate(sessionStorage.getItem("room_id") + "")
                .then(
                    response => {
                        this.setState({KPICate : response.data})
                    }
                )
        });
    }

    deleteDataClicked(kpi_id){
        KPICateService.deleteCategory(kpi_id)
            .then(
                response => {
                    if(response === true){
                        this.setState({message: `You deleted data successfully !`})
                    }else{
                        alert("You cannot delete this one !")
                    }
                    KPICateService.getAllKPICate(
                        sessionStorage.getItem("room_id") + ""
                    )
                        .then(
                            response => {
                                this.setState({KPICate : response.data})
                            }
                        )
                }
            )
    }

    updateDataClicked(category_id){
        this.props.history.push(`kpiedit/${category_id}`)
    }

    insertDataClicked(){
        sessionStorage.setItem("category_id", sessionStorage.getItem("category_id"));
        sessionStorage.setItem("room_id", sessionStorage.getItem("room_id"));
        this.props.history.push(`listkpi/add`)
    }

    render() {
        return (
            <div className="container">
                <div className="menu-side-bar">
                    <div className="image">
                        <img src={logo} className="App-logo-custom" alt="logo"/>
                    </div>
                    <Link to={'/home'}>
                        <a className="navbar-side">▷ Quản lý kế hoạch</a>
                    </Link>
                    <Link to={'/hoachtoan'}>
                        <a className="navbar-side">▷ Quản lý hoạch toán</a>
                    </Link>
                    <Link to={'#'}>
                        <a className="navbar-side">▷ Quản lý KPI</a>
                    </Link>
                </div>
                <div className="content">
                    <div className="combobox-line">
                        <label className="label">Room:</label>
                        <select className="combobox" onClick={this.onClickRoom}>
                            <option disabled selected value={sessionStorage.getItem("room_id")}>Choose the Room</option>
                            {
                                this.state.rooms.map((data) =>
                                    <option value={data.id}>{data.name}</option>
                                )
                            }
                        </select>
                        <span className="logout">Hello {this.state.username} <button onClick={this.logout}>Logout</button></span>
                    </div>
                    <div className="content-kpi">
                        <h2 className="tab">⮞ Quản lý KPI</h2>
                        <table className="table-kpi">
                            <thead>
                            <tr>
                                <th style={{width: 100}}>KPI ID</th>
                                <th style={{width: 200}}>KPI Name</th>
                                <th style={{width: 400}}>Description</th>
                                <th style={{width: 50}}>Unit</th>
                                <th colSpan="2" style={{width: 90}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.KPICate.map(
                                    data =>
                                        <tr key={data.value_id}>
                                            <td style={{paddingLeft: 5}}>{data.category_id}</td>
                                            <td style={{paddingLeft: 3}}>{data.name}</td>
                                            {/*<td style={{paddingLeft: 15}}><textarea className="kpi-desc">{data.desc}</textarea></td>*/}
                                            <td style={{paddingLeft: 15}}>{data.desc}</td>
                                            <td style={{paddingLeft: 5}}>{data.unit}</td>
                                            <td>
                                                <button className="btnud" onClick={() => this.updateDataClicked(
                                                    data.category_id + "")}>↺
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btnud" onClick={() => this.deleteDataClicked(
                                                    data.category_id + "")}>X
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                        {this.state.message && <div className="alert-success">{this.state.message}</div>}
                        <div>
                            <button className="btn-add" onClick={() => this.insertDataClicked()}>Add New</button>
                        </div>
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

export default ListKPI