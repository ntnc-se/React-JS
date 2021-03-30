import './App.css';
import React, {Component} from "react";
import InsertDataApplication from "./Component/InsertDataApplication";

class App extends Component{
    render(){
        return(
            <div className="container">
                <InsertDataApplication/>
            </div>
        );
    }
}

export default App;
