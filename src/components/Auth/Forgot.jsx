import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import axios from "axios"
import { Redirect } from 'react-router-dom';
 class Forgot extends Component {
    state={
        email:'',
        message:'',
        success: false,
        processing : false,
    }

    //after form submit
    formSubmit  = (e) =>{
        this.setState({processing:true})
        e.preventDefault();
        const data={
            email:this.state.email,
        }

        axios.post('forgotpassword', data)
        .then((response)=> {
            this.setState({message:response.data.message,success:true,processing:false})
            
      })
          .catch( (error) => {
            this.setState({message:error.response.data.message,processing:false})
          });
    }
    render() {
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
        if(this.state.success){
            return <Redirect to={{pathname: "/PasswordReset", state: { email:this.state.email}}}/>
            
        }
        let processing="";
        if(this.state.processing){
            processing=(<div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
          </div>)
        }
        let submit="";
        if(!this.state.processing){
            submit=(<div>Submit</div>)
        }
        return (
            <>
            <div class="container">
			
            <div class="col-sm-4 col-sm-offset-1">
                <div class="login-form">
                    <h2>Login to your account</h2>
                    {error}
                    <form onSubmit={this.formSubmit}>
                        <input placeholder="Enter Eamil" type="email" class="form-control" name="email" aria-describedby="emailHelp"  required  onChange={(e)=>{this.setState({email:e.target.value})}} />     
                        
                        I don't have an account <Link to="/register">Register Now</Link><br></br>
                        <Link to="/Login">Allready I have an account</Link>
                        <button type="submit" class="btn btn-default"> {submit} {processing}
                        </button>
                        
                    </form>
                </div>
            </div>
            
            
    </div><br></br><br></br><br></br><br></br>
            
            </>
        )
    }
}

export default Forgot
