import React from 'react';
import { redirect } from '../../routes.js';
import { Form, Input, Button, Segment } from 'semantic-ui-react';
import styles from './Login.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import robot from './robot.png';
const myStyles = {
  background: {
    backgroundColor: '#93dc66',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  bodyText: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 2rem',
    marginTop: '2rem',
    fontSize: '2em',
    color: 'white',
    textShadow: '1px 1px #707070',
  },
};


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
        <img className={styles.robot} height={175} width={175} src={robot} />
        <h1 className='title' style={myStyles.bodyText}>MAXBY</h1>
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
         <Button className='loginButton' basic color='green' onClick={this.submitIfValid}>
           Log me in!
         </Button>
       </Form>
      );
  }
};

export default Login;

