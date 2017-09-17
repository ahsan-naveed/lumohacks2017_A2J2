import React from 'react';

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
            <button type="submit">Login</button>
            <input type="checkbox" checked="checked"/>
        </div>
      );
  }
};

export default Login;