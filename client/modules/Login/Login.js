import React from 'react';
import { redirect } from '../../routes.js';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }
   }
  render() {
      return (
        <div>
            <input type="text" placeholder="Enter Username" name="uname" required/> <br/>
            <input type="password" placeholder="Enter Password" name="psw" required/> <br/>
            <button type="submit" onClick={()=>redirect('surveys')}>Log Me In!</button>
        </div>
      );
  }
};

export default Login;