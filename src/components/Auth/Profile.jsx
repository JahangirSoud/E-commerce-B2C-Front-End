import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import { Redirect } from 'react-router-dom';
 class Profile extends Component {
    render() {
        
        let name;
        let email;
        if(this.props.user){
            name =this.props.user.name;
            email =this.props.user.email;
        }

         //checking authorization
         if(!localStorage.getItem('token')){
            return <Redirect  to={'/login'} />
        }
        return (
            <div>
                <h2>Name : {name}</h2>
                <h2>Email : {email}</h2>
            </div>
        )
    }
}

export default Profile
