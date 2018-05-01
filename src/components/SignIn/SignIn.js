import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import { TextField, RaisedButton } from 'material-ui';

import styles from './SignIn.css'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    showError: false,
    showSuccess: false,
    errorText: ''
  }

  updateField = (event, value, field) => {
    this.setState({
      [field]: value,
      showError: false,
      showSuccess: false
    })
  }

  resetState = () => (
    this.setState({
      email: '',
      password: '',
      showError: false
    })
  )

  submitForm = () => {
    const { email, password } = this.state
    if ( (!!email && !!password ) === false) {
      this.setState({
        showError: true
      })
    } else {
      const auth = { auth: { email, password } }
      this.props.onSignIn(auth)
    }
  }

  render() {
    const { email, password, showError, showSuccess, errorText = 'Please fill or correct all the fields' } = this.state;
    const { clickToSignUp } = this.props
    return (
      <Card
        style={{ width: '325px' }}
      >
        <CardTitle
          title='Sign in'
          subtitle='Web application' />
        <CardText>
          <div
            onClick={clickToSignUp}
          >
            Dont have an account ? Please <a className={styles.signUpLink}>Sign up</a>
          </div>
          <TextField
            floatingLabelText="Email"
            value={email}
            onChange={(e, value) => this.updateField(e, value, 'email')}
          /><br />
          <TextField
            floatingLabelText="Password"
            type="password"
            value={password}
            onChange={(e, value) => this.updateField(e, value, 'password')}
          /><br />
          <div className={styles.errorText}>
            {
              showError ? errorText : null
            }
          </div>
          <div className={styles.successText}>
            {
              showSuccess ? `User wass successfully created` : null
            }
          </div>
        </CardText>
        <CardActions>
          <RaisedButton
            label='Sign in'
            primary={true}
            onClick={this.submitForm}
          />
        </CardActions>
      </Card>
    );
  }
}

export default SignIn;
