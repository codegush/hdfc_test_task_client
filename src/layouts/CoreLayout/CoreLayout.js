import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

import { logout, checkAuth } from '../../reducers/session';
import styles from './CoreLayout.css'

const mapDispatch = { logout, checkAuth };
const mapState = ({ session }) => ({ session });

class CoreLayout extends Component {
  componentWillMount() {
    this.props.checkAuth();
  }

  render() {
    const { loggedIn } = this.props.session;
    return (
      <div className={styles.fluidContainer}>
        <MuiThemeProvider>
          <Fragment>
            <header className={styles.header}>
              Social Sign Up App
              {
                loggedIn && (
                  <RaisedButton
                    onClick={this.props.logout}
                    label="Logout"
                  />
                )
              }
            </header>
            {this.props.children}
          </Fragment>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(CoreLayout);
