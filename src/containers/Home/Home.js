import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../reducers/user'
import { createSession } from '../../reducers/session'
import Login from '../Login'

import SignUp from '../../components/SignUp';
import SignIn from '../../components/SignIn';

import styles from './Home.css';

const mapState = ({ user, session }) => ({ user, session });
const mapDispatch = { register, createSession };

class Home extends Component {
  state = {
    showSignUp: true,
    showSignIn: false
  };

  onSignUp = user => this.props.register(user)

  onSignIn = user => this.props.createSession(user)

  toggleSignUp() {
    const { showSignIn, showSignUp } = this.state;
    this.setState({
      showSignUp: !showSignUp,
      showSignIn: showSignUp === false ? false : showSignIn
    });
  }

  toggleSignIn() {
    const { showSignIn, showSignUp } = this.state;
    this.setState({
      showSignIn: !showSignIn,
      showSignUp: showSignIn === false ? false : showSignUp
    });
  }
  
  render() {
    const { showSignIn, showSignUp } = this.state;
    const { user } = this.props
    return (
      <div className={`container-fluid ${styles.auth}`}>
        <div className={styles.socialAuth}>
          <h3 className={styles.loginHeading}> Social logins </h3>
          <Login provider='Google'/>
          <Login provider='Facebook'/>
          <Login provider='LinkedIn'/>
          <Login provider='Twitter'/>
          <Login provider='Instagram'/>
          <Login provider='Github'/>
        </div>
        <div className="identity-auth">
          <h3 className={styles.loginHeading}>Web application login</h3>
          {
            showSignUp &&
              <SignUp
                onSignUp={this.onSignUp}
                user={user}
                clickToSignIn={() => this.toggleSignIn()}
              />
          }
          {
            showSignIn &&
              <SignIn
                onSignIn={this.onSignIn}
                clickToSignUp={() => this.toggleSignUp()}
              />
          }
        </div>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(Home);
