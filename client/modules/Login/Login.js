import React from 'react';
import { redirect } from '../../routes.js';
import { Form, Input, Button } from 'semantic-ui-react';

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
          <hr/>
          <Form.Field>
            <label>Enter Username</label> <br/>
            <Input type='text' onChange={this.handleUsernameChange}/>
          </Form.Field>

          <Form.Field>
            <label>Enter Password</label> <br/>
            <Input type='password' onChange={this.handlePasswordChange}/>
          </Form.Field>

          <Button onClick={this.submitIfValid}>
            Log me in!
          </Button>
          <hr/>
        </div>
      );
  }
};

export default Login;