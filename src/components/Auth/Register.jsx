import axios from 'axios';
import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import { Redirect } from 'react-router-dom';
 class Register extends Component {
    state ={
        name :'',
        email :'',
        password : '',
        message : ''
    }
    formSubmit=(e)=>{
        e.preventDefault();
        const data={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }
        axios.post('register',data)
        .then((response)=> {
            localStorage.setItem('token',response.data.token);  //token store on local storage
            this.setState({
                loggedIn:true,
            })
            this.props.setUser(response.data.user);

      })
      .catch( (error) => {
        this.setState({message:error.response.data.message})
      });
}
    render() {
        if(this.state.loggedIn){
            return <Redirect  to={'/Profile'} />
        }

         //checking authorization
         if(localStorage.getItem('token')){
            return <Redirect  to={'/Profile'} />
        }
        let error="";
        if(this.state.message){
            error=(
                <div>
                    <div class="alert alert-danger" role="alert">
                        {this.state.message}
                    </div>
                </div>
            )
        }
        return (
            <>
            <div class="container">
			
            <div class="col-sm-4 col-sm-offset-1">
                <div class="login-form">
                    <h2>Login to your account</h2>
                    {error}
                    <form onSubmit={this.formSubmit}>
                        <input placeholder="Email Name" type="Name" class="form-control" id="Name" placeholder="Enter Name" name="Name" onChange={(e)=>{this.setState({name:e.target.value})}}   />
                        <input placeholder="Enter Eamil" type="email" class="form-control" name="email" required  onChange={(e)=>{this.setState({email:e.target.value})}} />
                        <input type="password" class="form-control" id="password" placeholder="Enter password" name="password" onChange={(e)=>{this.setState({password:e.target.value})}} />
                        <span>
                            <input type="checkbox" class="checkbox"/> 
                            Keep me signed in
                        </span><br></br><br></br>
                        Forgot My Password <Link to="/forgot">Click here</Link><br></br>
                        <Link to="/Login">Allready I have an account</Link>
                        <button type="submit" class="btn btn-default">Login</button>
                    </form>
                </div>
            </div>
            
            
    </div><br></br><br></br><br></br><br></br>
            </>
        )
    }
}

export default Register
