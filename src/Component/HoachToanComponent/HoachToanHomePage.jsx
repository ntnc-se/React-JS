import React, {Component} from "react";
import logo from '../KPIComponent/Image/logo.jpg'
import {Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import KPIValueService from "../../Service/KPIValueService";
import RoomService from "../../Service/KPIRoomService";
import KPICateService from "../../Service/KPICateService";

class HoachToanHomePage extends Component{

    // constructor
    constructor(props) {
        super(props);
        this.state ={
            rooms: [],
            KPICate:[],
            KPIValue: [],
            room_id: '',
            numrecord: '',
            pagecurrent: 1,
            numpage: 1,
            Message: null,
            component_type: '',
            category_id: ''
        }
        this.onClickRoom = this.onClickRoom.bind(this)
        this.onClickToBindDataTable = this.onClickToBindDataTable.bind(this)
        this.convertRangeType = this.convertRangeType.bind(this)
        this.logout = this.logout.bind(this)
        this.loadAllRoomsFromDB = this.loadAllRoomsFromDB.bind(this)
        this.loadDefaultDataToTable = this.loadDefaultDataToTable.bind(this)
        this.updateDataClicked = this.updateDataClicked.bind(this)
        this.deleteDataClicked = this.deleteDataClicked.bind(this)
        this.insertDataClicked = this.insertDataClicked.bind(this)
        this.onClickStartDate = this.onClickStartDate.bind(this);
        this.onSubmitByDate = this.onSubmitByDate.bind(this);
        this.onClickNumberRecord = this.onClickNumberRecord.bind(this)
        this.onClickPrevious = this.onClickPrevious.bind(this)
        this.onClickNext = this.onClickNext.bind(this)
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

    loadAllRoomsFromDB(){
        RoomService.getAllRooms()
            .then(
                response => {
                    this.setState({rooms : response.data})
                }
            )
    }

    loadDefaultDataToTable(){
        KPIValueService.getArrayToPaging(
            2 + "",
            sessionStorage.getItem("category_id") + "",
            sessionStorage.getItem("numrecord") +"",
            sessionStorage.getItem("pagecurrent") +"")
            .then(
                response => {
                    this.setState({KPIValue : response.data})
                }
            )
    }

    logout(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("room_id");
        sessionStorage.removeItem("category_id");
        sessionStorage.removeItem("numrecord");
        sessionStorage.removeItem("pagecurrent");
        sessionStorage.removeItem("private_user_name");
        this.props.history.push(`/`)
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

    onClickNumberRecord(e){
        this.setState({numrecord: e.target.value, message: ''}, function () {
            sessionStorage.setItem("numrecord", this.state.numrecord);
            KPIValueService.getArrayToPaging(
                2 + "",
                sessionStorage.getItem("category_id") + "",
                sessionStorage.getItem("numrecord") +"",
                sessionStorage.getItem("pagecurrent") +"")
                .then(
                    response => {
                        this.setState({KPIValue : response.data})
                    }
                )
            KPIValueService.getNumberPage(
                2 + "",
                sessionStorage.getItem("category_id") + "",
                sessionStorage.getItem("numrecord") + "")
                .then(
                    response => {
                        this.setState({numpage : (response.data-1)})
                    }
                )
        });
    }

    onClickPrevious(){
        let page = this.state.pagecurrent
        if(page === 1){
            sessionStorage.setItem("pagecurrent", 1 + "")
        }else {
            sessionStorage.setItem("pagecurrent", (page - 1) + "")
            this.setState({pagecurrent: (page - 1)})
        }
        KPIValueService.getArrayToPaging(
            2 + "",
            sessionStorage.getItem("category_id") + "",
            sessionStorage.getItem("numrecord") +"",
            sessionStorage.getItem("pagecurrent") +"")
            .then(
                response => {
                    this.setState({KPIValue : response.data})
                }
            )
    }

    onClickNext() {
        let page = this.state.pagecurrent
        if (page > this.state.numpage) {
            sessionStorage.setItem("pagecurrent", (this.state.numpage + 1) + "")
        } else {
            sessionStorage.setItem("pagecurrent", (page + 1) + "")
            this.setState({pagecurrent: (page + 1)})
        }
        KPIValueService.getArrayToPaging(
            2 + "",
            sessionStorage.getItem("category_id") + "",
            sessionStorage.getItem("numrecord") + "",
            sessionStorage.getItem("pagecurrent") + "")
            .then(
                response => {
                    this.setState({KPIValue: response.data})
                }
            )
    }

    convertRangeType(type){
        if(type == 1){
            return "Daily";
        }if(type == 2){
            return "Weekly";
        }if(type == 3){
            return "Monthly";
        }if(type == 4){
            return "Quarterly";
        }if(type == 5){
            return "Annually";
        }
    }

    onClickToBindDataTable(e){
        this.setState({category_id: e.target.value, message: ''}, function () {
            sessionStorage.setItem("category_id", this.state.category_id);
            KPIValueService.getArrayToPaging(
                2 + "",
                sessionStorage.getItem("category_id") + "",
                sessionStorage.getItem("numrecord") +"",
                sessionStorage.getItem("pagecurrent") +"")
                .then(
                    response => {
                        this.setState({KPIValue : response.data})
                    }
                )
            KPIValueService.getNumberPage(
                2 + "",
                sessionStorage.getItem("category_id") + "",
                sessionStorage.getItem("numrecord") + "")
                .then(
                    response => {
                        this.setState({numpage : (response.data - 1)})
                    }
                )
        });
    }

    deleteDataClicked(kpi_id, start_date, range_type, component_type){
        KPIValueService.deleteData(kpi_id, start_date, range_type, component_type)
            .then(
                response => {
                    this.setState({message: `You deleted data successfully !`})
                    KPIValueService.getArrayToPaging(
                        2 + "",
                        sessionStorage.getItem("category_id") + "",
                        sessionStorage.getItem("numrecord") +"",
                        sessionStorage.getItem("pagecurrent") +""
                    )
                        .then(
                            response => {
                                this.setState({KPIValue : response.data})
                            }
                        )
                }
            )
    }

    updateDataClicked(kpi_id, start_date, range_type, component_type){
        this.props.history.push(`hoachtoanedit/${kpi_id}/${start_date}/${range_type}/${component_type}`)
    }

    insertDataClicked(){
        sessionStorage.setItem("category_id", sessionStorage.getItem("category_id"));
        sessionStorage.setItem("room_id", sessionStorage.getItem("room_id"));
        KPICateService.getKPICateById(sessionStorage.getItem("category_id") + "")
            .then(
                response => {
                    sessionStorage.setItem("category_id", response.data)
                }
            )
        this.props.history.push(`hoachtoan/add`)
    }

    onClickStartDate(e){
        this.setState({start_date: e.target.value, message: ''}, function () {
        });
    }

    onSubmitByDate(e){
        KPIValueService.getAllKPIValueByDate(
            2 + "",
            sessionStorage.getItem("category_id") + "",
            this.state.start_date+ "")
            .then(
                response => {
                    this.setState({KPIValue : response.data})
                }
            )
        console.log(this.state.start_date)
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
                    <Link to={'/listkpi'}>
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
                        <label className="label">KPI Category:</label>
                        <select className="combobox-kpi" onClick={this.onClickToBindDataTable}>
                            <option disabled selected value={sessionStorage.getItem("category_id")}>Choose the Category</option>
                            {
                                this.state.KPICate.map((data) =>
                                    <option value={data.category_id}>{data.name}</option>
                                )
                            }
                        </select>
                        <span className="logout">Hello {this.state.username} <button onClick={this.logout}>Logout</button></span>
                    </div>
                    <div className="content-homepage">
                        <h2 className="tab">⮞ Số Chốt</h2>
                        <Formik initialValues={{}} onSubmit={this.onSubmitByDate} validateOnchange={false} validateOnBlur={false}
                                enableReinitialize={true}>
                            {
                                (props) => (
                                    <Form className="form-search">
                                        <fieldset className="form-group-search">
                                            Choose date: <Field
                                            onChange={ (e) => this.onClickStartDate(e)} value = {this.state.start_date}
                                            className="form-control-search" type="date" name="date"/>
                                        </fieldset>
                                        <button className="btn-search" type="submit">Search</button>
                                    </Form>
                                )
                            }
                        </Formik>
                        <h1 className="title">Data Phòng {sessionStorage.getItem("room_id")} -
                            {sessionStorage.getItem("category_id")}</h1>
                        <label className="label-record">Number records: </label>
                        <select className="combobox-record" onClick={this.onClickNumberRecord}>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                        <button className="btncontrol" onClick={() => this.onClickPrevious()}>ᐊ</button>
                        <input className="page-current" type="text" value={sessionStorage.getItem("pagecurrent")}/>
                        <button className="btncontrol-next" onClick={() => this.onClickNext()}>ᐅ</button>
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="id_column" style={{width: 1}}>ID</th>
                                <th style={{width: 100}}>Room Name</th>
                                <th style={{width: 240}}>Category Name</th>
                                <th style={{width: 120}}>Value</th>
                                <th style={{width: 50}}>Unit</th>
                                <th style={{width: 100}}>Start date</th>
                                <th style={{width: 100}}>Cycle type</th>
                                <th colSpan="2" style={{width: 80}}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.KPIValue.map(
                                    data =>
                                        <tr key={data.value_id}>
                                            <td className="id_column" style={{paddingLeft: 1}}>{data.id}</td>
                                            <td style={{paddingLeft: 3}}>P. {data.room_name}</td>
                                            <td style={{paddingLeft: 5}}>{data.name}</td>
                                            {/* toLocaleString() is build-in func to format number */}
                                            <td>{data.value.toLocaleString()}</td>
                                            <td style={{paddingLeft: 15}}>{data.unit}</td>
                                            <td style={{paddingLeft: 15}}>{data.start_date}</td>
                                            <td>{this.convertRangeType(data.range_type)}</td>
                                            <td>
                                                <button className="btnud" onClick={() => this.updateDataClicked(data.id,
                                                    data.start_date, data.range_type, 2)}>↺
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btnud" onClick={() => this.deleteDataClicked(data.id,
                                                    data.start_date, data.range_type, 2)}>X
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

export default HoachToanHomePage