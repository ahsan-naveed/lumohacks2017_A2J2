import React from 'react';
import { redirect } from '../../routes.js';
import { Form, Input, Button, Segment } from 'semantic-ui-react';
import styles from './Login.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        <Form className={styles.login}>
        <h1 className='title'>Welcome!</h1>
        <br />
          <Form.Field required className={styles.input}>
            <label>Enter Username</label> <br/>
            <Input type='text' onChange={this.handleUsernameChange}/>
          </Form.Field>
         <br />
          <Form.Field required className={styles.input}>
            <label>Enter Password</label> <br/>
            <Input type='password' onChange={this.handlePasswordChange}/>
          </Form.Field>
         <br />
         <Button className='loginButton' basic color='teal' onClick={this.submitIfValid}>
           Log me in!
         </Button>
       </Form>
      );
  }
};

export default Login;

