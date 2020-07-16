import React, { Component }  from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';
import SearchState from './searchstate';
import History from './history';


class App extends Component {

   render(){
    return(
        <div className="App">
       <Router>
         <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand">Weather Time</Link>
          <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to="/search" className="nav-link">Search</Link>
            </li>
            <li className="navbar-item">
            <Link to="/delete" className="nav-link">History</Link>
            </li>
          </ul>
          </div>
          </nav>
         
         <Route path="/search"  component={SearchState}/>
         <Route path="/delete"  component={History}/>
       </Router>
       </div>
      
    );
   }
  }

export default App;
