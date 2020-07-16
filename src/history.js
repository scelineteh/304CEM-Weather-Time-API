import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Popup from 'react-popup';
import './Popup.css';
//import ReactTable from "react-table";
//import "react-table/react-table.css";

export default class History extends Component {
    constructor(){
        super();
        this.state ={
            items:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getallState = () =>{
        axios
        .get('/getallstates')
        .then(result =>{
            this.setState({items: result.data});
            console.log(this.state.items);
        })
        .catch(error => {
            console.log(error);
        });
    };

    componentDidMount(){
        this.getallState();
    }

    handleSubmit(e){
        const query = `/deletestate?loc=${this.input.value}`;
        console.log(query);
        e.preventDefault();
        axios
        .get(query)
        .then(result =>{
            console.log(result);
            if (result.data === 'Not found'){
                Popup.alert('State Not Found');
            }
            Popup.alert(result.data);
            this.getallState();
        })
        .catch(error => {
            alert('Error:',error);
        })
    }

    render(){
        return(
            <div className="App">
            <h1>No history Found</h1>
            <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Enter a state name that you want to delete:</label>
                        <br />
                        <label>
                        <input type="text" 
                            required className="form-control"                       
                            ref={input =>(this.input = input)}
                            placeholder="To Delete..." 
                        />
                        </label>
                        <br />
                        <input type="submit" className="btn btn-primary" value="Delete"  />
                    </div>
            </form>
            </div>
        )
    }
}