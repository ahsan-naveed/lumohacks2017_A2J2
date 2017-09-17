import React from 'react';
import { redirect } from '../../routes.js';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitIfValid = this.submitIfValid.bind(this);

   }

   handleUsernameChange(e){
     this.setState({username: e.target.value});
   }

   handlePasswordChange(e){
     this.setState({password: e.target.value});
   }

   submitIfValid(){
     if(this.state.username.length && this.state.password.length){
       redirect('surveys');
     }
   }
   
  render() {
      return (
        <div>
          <form>
            <input type="text" placeholder="Enter Username" onChange={this.handleUsernameChange}/> <br/>
            <input type="password" placeholder="Enter Password" onChange={this.handlePasswordChange}/> <br/>
            <button onClick={this.submitIfValid}>Log Me In!</button>
          </form>
        </div>
      );
  }
};

export default Login;