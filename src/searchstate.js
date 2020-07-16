import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import Popup from 'react-popup';
import './Popup.css';

export default class SearchState extends Component {
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
        const query = `/getstate?loc=${this.input.value}`;
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
        var data = this.state.items;
        data =data.reverse();
            return(
                <div className="App">
                    <h2>Search</h2>
                    <h3>Get weather and time</h3>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Enter a state name:</label>
                            <br />
                            <label>
                            <input type="text" 
                                required className="form-control"
                                ref={input =>(this.input = input)}
                                placeholder="Search..." 
                            />
                            </label>
                            <br />
                            <input type="submit" className="btn btn-primary" value="Search"  />
                        </div>
                    </form>
                    <p />
                    <Popup />
                  
        </div>
            );
        }
    }
