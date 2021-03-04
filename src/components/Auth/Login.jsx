import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import axios from "axios";
import { Redirect } from 'react-router-dom';
class Login extends Component {
    state={
        email:'',
        password:'',
        message:''
    }

    //after form submit
    formSubmit  = (e) =>{
        e.preventDefault();
        const data={
            email:this.state.email,
            password:this.state.password
        }

        axios.post('login', data)
          .then((response)=> {
                localStorage.setItem('token',response.data.token);  
                     //token store on local storage
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
        //after login redirect profile
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
							<input placeholder="Email Address" type="email" class="form-control" name="email" aria-describedby="emailHelp"  required  onChange={(e)=>{this.setState({email:e.target.value})}}   />
							<input placeholder="Password" type="password" class="form-control" name="password" required onChange={(e)=>{this.setState({password:e.target.value})}} />
							<span>
								<input type="checkbox" class="checkbox"/> 
								Keep me signed in
							</span><br></br><br></br>
                            Forgot My Password <Link to="/forgot">Click here</Link><br></br>
                            I don't have an account <Link to="/register">Register Now</Link>
							<button type="submit" class="btn btn-default">Login</button>
						</form>
					</div>
				</div>
				
				
		</div><br></br><br></br><br></br><br></br>
	


            
                    
            </>
        )
    }
}

export default Login
