import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQueryParam } from '../../utils';
import { login } from '../../reducers/session';

const mapState = ({ router }) => ({ router });
const mapDispatch = { login };

class Auth extends Component {
  componentWillMount() {
    const { search } = this.props.location;
    const token = getQueryParam('token', search);
    this.props.login(token);
  }

  render() {
    return null;
  }
}

export default connect(mapState, mapDispatch)(Auth);
