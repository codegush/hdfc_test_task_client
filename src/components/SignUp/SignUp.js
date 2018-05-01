import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import { TextField, RaisedButton } from 'material-ui';

import styles from './SignUp.css'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    showError: false,
    showSuccess: false,
    errorText: ''
  };

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
      passwordConfirmation: '',
      showError: false
    })
  )

  componentWillReceiveProps(nextProps) {
    const { user = {} } = nextProps
    const { loading, created, error = null } = user
    if (!loading && created) {
      this.resetState()
      this.setState({ showSuccess: true })
    }
    if (error) {
      this.setState({
        errorText: error.detail,
        showError: true
      })
    }
  }

  submitForm = () => {
    const { email, password, passwordConfirmation } = this.state
    if ( (!!email && !!password && !!passwordConfirmation && password === passwordConfirmation) === false) {
      this.setState({
        showError: true
      })
    } else {
      const user = { user: { email, password, password_confirmation: passwordConfirmation } }
      this.props.onSignUp(user)
    }
  }

  render() {
    const { email, password, passwordConfirmation, showError, showSuccess, errorText = 'Please fill or correct all the fields' } = this.state;
    const { clickToSignIn } = this.props
    return (
      <Card
        style={{ width: '325px' }}
      >
        <CardTitle
          title='Sign up'
          subtitle='Web application' />
        <CardText>
          <div
            onClick={clickToSignIn}
          >
            Already have an account ? Please <a className={styles.signInLink}>Sign in</a>
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
          <TextField
            floatingLabelText="Re-type Password"
            type="password"
            value={passwordConfirmation}
            onChange={(e, value) => this.updateField(e, value, 'passwordConfirmation')}
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
            label='Sign up'
            primary={true}
            onClick={this.submitForm}
          />
        </CardActions>
      </Card>
    );
  }
}

export default SignUp;
