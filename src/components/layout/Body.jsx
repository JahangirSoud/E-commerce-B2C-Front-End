import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "../Home";
import About from "../About";
import Contact from "../Contact";
import Blogdetails from "../Blogdetails";

import Forgot from "../Auth/Forgot";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import PasswordReset from "../Auth/PasswordReset";
import Profile from "../Auth/Profile";

import Header from './Header';
import axios from "axios";

export class Body extends Component {
    state={
        user:{}
    }

    componentDidMount()
    {
          //login user credentials
          axios.get('user')
          .then((response)=> {
             this.setUser(response.data)
          })
          .catch( (error) => {
            console.log(error);
          });   
    }

    setUser =(user) =>{
        this.setState({user:user})
    }
    render() {
        return (
            <>
                <Router>
                    <Header user={this.state.user} setUser={this.setUser} />
                    <Switch>
                        <Route exact path="/"  component={Home} />
                        <Route exact path="/about"  component={About} />
                        <Route exact path="/Forgot"  component={Forgot} />
                        <Route exact path="/Register"  component={() =>  <Register  user={this.state.user} setUser={this.setUser} />} />
                        <Route exact path="/contact"  component={Contact} />
                        <Route exact path="/Login"  component={() =>  <Login  user={this.state.user} setUser={this.setUser} />} />
                        <Route exact path="/blog-details"  component={Blogdetails} />
                        <Route exact path="/PasswordReset"  component={PasswordReset} />
                        <Route exact path="/Profile"  component={() =>  <Profile  user={this.state.user}  />} />
                    </Switch>
                </Router>
            
            </>
        )
    }
}

export default Body
