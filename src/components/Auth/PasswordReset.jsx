import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import axios from "axios";
import { Redirect } from 'react-router-dom';
class PasswordReset extends Component {
    state={
        token:'',
        password:'',
        message:'',
        success:false,
    }
    

    formSubmit =(e)=>{
        e.preventDefault();
        const data={
            token:this.state.token,
            email:this.props.location.state.email,
            password:this.state.password,
        }

        axios.post('resetpassword', data)
          .then((response)=> {
              this.setState({message:response.data.message,success:true});
          })
          .catch( (error) => {
                this.setState({message:error.response.data.message})
          });
    }



    render() {

        if(this.state.success){
            return <Redirect  to={'/Login'} />
        }
        let error="";
        if(this.state.message){
            error=(
                <div>
                    <div class="alert alert-primary" role="alert">
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
                    <form  onSubmit={this.formSubmit}>
                    <input type="email" class="form-control" name="email" placeholder={this.props.location.state.email} value={this.props.location.state.email}  required/>
                        <input placeholder="Token" type="text" class="form-control" name="token" onChange={(e)=>{this.setState({token:e.target.value})}}  required />
                        <input  placeholder="Enter New password" type="password" class="form-control" name="password" onChange={(e)=>{this.setState({password:e.target.value})}}  required/>
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

export default PasswordReset
                